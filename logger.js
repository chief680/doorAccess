/**
 * Logger module
 * @module Logger
 */

var db = require("./db.js");

const Logger = {
  /**
   * logEntry: get the id from req, then create an entry in DB
   * @param {object} req
   */
  async logEntry(req) {
    if (!req.params.id || isNaN(req.params.id)) return null;

    const id = req.params.id;
    const msg = await db.createEntry(id);
    return msg;
  }
};

module.exports = Logger;
