const bcrypt = require('bcryptjs');
const User = require('../models/users-model.js');
// 1. hash the user password
// 1. insert the user into the database with the hashed password
// 1. return user
// 2. check if user exists..
// 2. If they don't, throw an error message that can get recongized by the Try/Catch in controller
// 3. take the plaintext password, hash it, and compare it
// 3. against the password hash we have saved in the db
module.exports = class Service {
    
  static async createUser({ email, password }) {

    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.Salt_Rounds)
    );
    
    // 2. check if user exists..
    const userExist = await User.findUserByEmail(email);
    if (userExist) {
      throw new Error('User/email already taken');
    }

    const newUser = await User.insert(email, passwordHash);

    return newUser;
  }

  static async authLogin({ email, password }) {

    const userExist = await User.findUserByEmail(email);

    if (!userExist) {
      throw new Error('There is either an invalid email OR password');
    }

    const pwMatch = await bcrypt.compare(
      password,
      userExist.passwordHash
    );

    if (!pwMatch) {
      throw new Error('There is either an invalid email OR password');
    }
    
    return userExist;
  }
};


