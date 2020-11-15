const joi = require('joi');

const noteIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createNoteSchema = joi.object({
  content: joi.string().min(1).required(),
});

const updateNoteSchema = joi.object({
  content: joi.string().min(1),
});

module.exports = {
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
};
