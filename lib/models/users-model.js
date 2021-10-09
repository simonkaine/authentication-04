const pool = require('../utils/pool.js');

module.exports = class User {

    id;
    email;
    passwordHash; // underscore?

  constructor(row){
    this.id = row.id;
    this.email = row.email;
    this.passwordHash = row.password_hash;
  }

  static async insert( email, passwordHash ) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *', 
      [email, passwordHash]
    );
    return new User(rows[0]);
  }

  static async findUserByEmail(email) {
    const { rows } = await pool.query(
        'SELECT * FROM users WHERE email = $1', 
        [email]);

    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  static async getMeCookie(userId) {
    const { rows } = await pool.query(
        'SELECT * FROM users WHERE id = $1', 
        [userId]
        );
    return new User(rows[0]);
  }

  toJSON() {
      return {
          id: this.id,
          email: this.email,
      }
  }

}