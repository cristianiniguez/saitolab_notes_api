const express = require('express');
const passport = require('passport');
const joi = require('joi');
const boom = require('@hapi/boom');

const NotesService = require('../services/notes');
const { noteIdSchema, createNoteSchema, updateNoteSchema } = require('../utils/schemas/notes');
const validationHandler = require('../utils/middleware/validationHandlers');

// JWT strategy
require('../utils/auth/strategies/jwt');

const notesApi = (app) => {
  const router = express.Router();
  app.use('/api/notes', router);

  const notesService = new NotesService();

  router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    if (!req.user) {
      next(boom.unauthorized());
    }
    try {
      const notes = await notesService.getNotes({ userId: req.user._id });
      res.status(200).json({
        data: notes,
        message: 'notes listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler(joi.object({ id: noteIdSchema }), 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const note = await notesService.getNote({ id, userId: req.user._id });
        res.status(200).json({
          data: note,
          message: 'note listed',
        });
      } catch (error) {
        next(error);
      }
    },
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createNoteSchema),
    async (req, res, next) => {
      const { title, content } = req.body;
      const data = {
        userId: req.user._id,
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      try {
        const createdNoteId = await notesService.createNote({ data });
        res.status(201).json({
          data: createdNoteId,
          message: 'note created',
        });
      } catch (error) {
        next(error);
      }
    },
  );

  router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler(joi.object({ id: noteIdSchema }), 'params'),
    validationHandler(updateNoteSchema),
    async (req, res, next) => {
      const { id } = req.params;
      const { content } = req.body;
      const data = {
        content,
        updatedAt: new Date(),
      };
      try {
        const updatedNoteId = await notesService.updateNote({ id, data, userId: req.user._id });
        res.status(200).json({
          data: updatedNoteId,
          message: 'note updated',
        });
      } catch (error) {
        next(error);
      }
    },
  );

  router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler(joi.object({ id: noteIdSchema }), 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const deletedNoteId = await notesService.deleteNote({ id, userId: req.user._id });
        res.status(200).json({
          data: deletedNoteId,
          message: 'note deleted',
        });
      } catch (error) {
        next(error);
      }
    },
  );
};

module.exports = notesApi;
