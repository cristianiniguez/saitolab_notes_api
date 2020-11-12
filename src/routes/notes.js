const express = require('express');

const NotesService = require('../services/notes');

const notesApi = (app) => {
  const router = express.Router();
  app.use('/api/notes', router);

  const notesService = new NotesService();

  router.get('/', async (req, res, next) => {
    try {
      const notes = await notesService.getNotes();
      res.status(200).json({
        data: notes,
        message: 'notes listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const note = await notesService.getNote({ id });
      res.status(200).json({
        data: note,
        message: 'note listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    const { content } = req.body;
    try {
      const createdNoteId = await notesService.createNote({ data: { content } });
      res.status(201).json({
        data: createdNoteId,
        message: 'note created',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
      const updatedNoteId = await notesService.updateNote({ id, data: { content } });
      res.status(200).json({
        data: updatedNoteId,
        message: 'note updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedNoteId = await notesService.deleteNote({ id });
      res.status(200).json({
        data: deletedNoteId,
        message: 'note deleted',
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = notesApi;
