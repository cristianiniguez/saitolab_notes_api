const MongoLib = require('../lib/mongo');

class NotesService {
  constructor() {
    this.collection = 'notes';
    this.mongoDB = new MongoLib();
  }

  async getNotes() {
    const notes = await this.mongoDB.getAll(this.collection);
    return notes || [];
  }

  async getNote({ id }) {
    const note = await this.mongoDB.get(this.collection, id);
    return note || {};
  }

  async createNote({ data }) {
    const createdNoteId = await this.mongoDB.create(this.collection, data);
    return createdNoteId;
  }

  async updateNote({ id, data }) {
    const updatedNoteId = await this.mongoDB.update(this.collection, id, data);
    return updatedNoteId;
  }

  async deleteNote({ id }) {
    const deletedNoteId = await this.mongoDB.delete(this.collection, id);
    return deletedNoteId;
  }
}

module.exports = NotesService;
