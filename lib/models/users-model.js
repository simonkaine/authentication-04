const pool = require('../utils/pool.js');
const RoleModel = require('./role-model.js');
const jwt = require('jsonwebtoken');

module.exports = class User {

    id;
    email;
    passwordHash; // underscore?
    role;

  constructor(row){
    this.id = row.id;
    this.email = row.email;
    this.passwordHash = row.password_hash;
    this.role = row.role; // add a role into blueprint
  }

  // pass in role
  // create role-model class
  static async insert( email, passwordHash, titleOfRole) {
  
    console.log(titleOfRole);
    const role = await RoleModel.findRoleByTitle(titleOfRole); 
    console.log('ROLE', role); // <<<<<< CONSOLE LOG = NULL
  
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash, role_id) VALUES ($1, $2, $3) RETURNING *', 
      [email, passwordHash, role.id]
    );
    // return new User(rows[0]);
    return new User({ ...rows[0], role: role.title });
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

  authToken() {
    return jwt.sign(this.toJSON(), process.env.SECRET_TOKEN, {
      expiresIn: '24h',
    });
  }

  toJSON() {
      return {
          id: this.id,
          email: this.email,
          role: this.role,
      }
  }
}