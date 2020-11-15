const boom = require('@hapi/boom');
const MongoLib = require('../lib/mongo');

class NotesService {
  constructor() {
    this.collection = 'notes';
    this.mongoDB = new MongoLib();
  }

  async getNotes({ userId }) {
    const query = userId && { userId };
    const notes = await this.mongoDB.getAll(this.collection, query);
    return notes || [];
  }

  async getNote({ id, userId }) {
    const note = await this.mongoDB.get(this.collection, id);
    if (note) {
      if (note.userId.toString() === userId.toString()) {
        return note;
      } else {
        throw boom.unauthorized();
      }
    } else {
      return {};
    }
  }

  async createNote({ data }) {
    const createdNoteId = await this.mongoDB.create(this.collection, data);
    return createdNoteId;
  }

  async updateNote({ id, data, userId }) {
    try {
      const foundedNote = await this.getNote({ id, userId });
      if (foundedNote._id) {
        const updatedNoteId = await this.mongoDB.update(this.collection, id, data);
        return updatedNoteId;
      } else {
        throw boom.unauthorized();
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteNote({ id, userId }) {
    try {
      const foundedNote = await this.getNote({ id, userId });
      if (foundedNote._id) {
        const deletedNoteId = await this.mongoDB.delete(this.collection, id);
        return deletedNoteId;
      } else {
        throw boom.unauthorized();
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = NotesService;
