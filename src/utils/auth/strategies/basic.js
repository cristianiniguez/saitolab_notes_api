const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UsersService = require('../../../services/users');

passport.use(
  new BasicStrategy(async (email, password, cb) => {
    const usersService = new UsersService();
    try {
      const user = await usersService.getUserByEmail({ email });

      if (!user) {
        return cb(boom.unauthorized());
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized());
      }

      delete user.password;
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  }),
);
