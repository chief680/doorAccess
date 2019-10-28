/**
 * DB module
 * @module DB
 */

var Pool = require("pg").Pool;
var dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL
});

const DB = {
  /**
   * DB Query
   * @param {string} text
   * @param {object} params
   * @returns {object} object
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(text, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   * Create a log entry in db
   * @param {object} id
   * @returns {object} object
   */
  async createEntry(id) {
    const text = "insert into entry_history values($1, $2) returning *";
    const values = [id, new Date()];

    try {
      const { rows } = await this.query(text, values);
      return rows[0];
    } catch (error) {
      return null;
    }
  },
  /**
   * Get access code for id from db
   * @param {string} id
   * @returns {Boolean} True if the id has a code, otherwise false
   */
  async getAccessCode(id) {
    const text = "select * from access_code where id = $1";
    try {
      const { rows } = await this.query(text, [id]);
      if (!rows[0]) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
};

module.exports = DB;
