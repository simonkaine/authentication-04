const bcrypt = require('bcryptjs');
const User = require('../models/users-model.js');
// 1. hash the user password
// 1. insert the user into the database with the hashed password
// 1. return user
// 2. check if user exists..
// 2. If they don't, throw an error message that can get recongized by the Try/Catch in controller

module.exports = class Service {
    
  static async createUser({ email, password }) {

    console.log('SIGNUP body', email, password);
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.Salt_Rounds)
    );
    
    const newUser = await User.insert(email, passwordHash);

    console.log('!!!!!', newUser);

    return newUser;
  }
};


