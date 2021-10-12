const pool = require("../utils/pool")

module.exports = class RoleModel {
    id;
    title;

    constructor(row) {
        this.id = row.id;
        this.title = row.title
    }

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM roles WHERE id = $1', [id]);
    
        if (!rows[0]) return null;
    
        return new RoleModel(rows[0]);
    }

    static async findRoleByTitle(title) {
        
        const { rows } = await pool.query('SELECT * FROM roles WHERE title = $1', [title.toUpperCase()]);
        console.log(rows, 'ROWS');
    
        if (!rows[0]) return null;
        return new RoleModel(rows[0]);
    }
}