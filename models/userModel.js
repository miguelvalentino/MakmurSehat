const pool = require('../database');

const createUser = async (name, email, no_telpon, password) => {
    return await pool.query(
        'INSERT INTO users (name, email, no_telpon, password) VALUES ($1, $2, $3, $4)',
        [name, email, no_telpon, password]
        
    );
    
};

const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};


module.exports = {
    createUser,
    getUserByEmail,
};
