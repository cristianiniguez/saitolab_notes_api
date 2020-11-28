const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const { authJwtSecret } = require('../config');
const UsersService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandlers');
const { createUserSchema } = require('../utils/schemas/users');

// Basic Strategy
require('../utils/auth/strategies/basic');

const authApi = (app) => {
  const router = express.Router();
  app.use('/api/auth', router);

  const usersService = new UsersService();

  router.post('/sign-in', (req, res, next) => {
    passport.authenticate('basic', (error, user) => {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }

        req.login(user, { session: false }, async (error) => {
          if (error) next.unauthorized();

          const { _id: id, name, email } = user;
          const payload = { sub: id, name, email };
          const token = jwt.sign(payload, authJwtSecret, { expiresIn: 86400 });

          res.status(200).json({ token, user: { id, name, email } });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post('/sign-up', validationHandler(createUserSchema), async (req, res, next) => {
    const user = req.body;
    try {
      const createdUserId = await usersService.createUser({ user });
      res.status(201).json({
        data: createdUserId,
        message: 'user created',
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = authApi;
