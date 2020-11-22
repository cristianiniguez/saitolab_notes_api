const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

const MongoLib = require('../lib/mongo');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUser({ id }) {
    const user = await this.mongoDB.get(this.collection, id);
    return user || {};
  }

  async getUserByEmail({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async createUser({ user }) {
    const { name, email, password } = user;
    const findedUser = await this.getUserByEmail({ email });
    if (findedUser) {
      throw boom.badRequest('user with this email alredy exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword,
    });
    return createdUserId;
  }
}

module.exports = UsersService;
