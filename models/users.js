import pool from '../config/db.js'
import crypto from 'crypto';


class UserModel {

   // Hashing function
   static hashPassword(plainText) {
    if (typeof plainText !== 'string') {
      throw new TypeError('The input must be a string');
    }

    // Calculate MD5 hash of the plain text
    const md5HashValue = crypto.createHash('md5').update(plainText).digest('hex');

    // Salt the plain text with MD5 hash
    const first10 = md5HashValue.substring(0, 10);
    const last22 = md5HashValue.substring(md5HashValue.length - 22);
    const saltedText = first10 + plainText + last22;

    // Compute the SHA-256 hash of the salted text
    const sha256HashValue = crypto.createHash('sha256').update(saltedText).digest('hex');

    return sha256HashValue;
  }

  // Authenticate method
  static async authenticate(username, password) {
    try {
      if (!username || !password) {
        throw new Error('Username or password is missing');
      }

      const hashedPassword = UserModel.hashPassword(password);

      // Query the database to find a user with the given username and hashed password
      const [rows] = await pool.query(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, hashedPassword]
      );

      // Check if any rows are returned
      if (rows.length > 0) {
        return rows[0]; // Return the first matched user
      } else {
        return null; // Return null if no user is found
      }
    } catch (err) {
      console.error('Error querying the database:', err);
      throw new Error('Database query failed');
    }
  }


  // Method to get all users
  static async getAllUsers() {
    try {
      const [rows] = await pool.query('SELECT username, email, created_at FROM users');
      return rows;
    } catch (err) {
      console.error('Error querying the database:', err);
      throw new Error('Database query failed');
    }
  }

  static async getUserByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
}

  // Method to create a new user
  static async createUser(username, email, password) {
    try {

      const hashedPassword = UserModel.hashPassword(password);

      // Check if username or email already exists
      const [existingUsers] = await pool.query(
        'SELECT * FROM users WHERE username = ? OR email = ?',
        [username, email]
      );

      if (existingUsers.length > 0) {
        return null; // User with the same username or email already exists
      }

      // Insert new user into the database
      const [result] = await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );

      if (result.affectedRows > 0) {
        return { id: result.insertId, username, email, password };
      } else {
        return null;
      }
    } catch (err) {
      console.error('Error inserting user into the database:', err);
      throw new Error('Database insert failed');
    }
  }

  static async deleteUser(username) {
    const [results] = await pool.query('DELETE FROM users WHERE username = ?', [username]);
    return results;
}

static async updateUserField(username, field, newValue) {
    const query = `UPDATE users SET ${field} = ? WHERE username = ?`;
    const [results] = await pool.query(query, [newValue, username]);
    return results;
}



  }
  
  export default UserModel;