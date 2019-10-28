/**
 * accessDOor module
 * @module accessDoor
 */
var validator = require("./validator.js");
var logger = require("./logger.js");

/**
 * accessDoor: if validator returns true, log the entry
 * otherwise throw an error
 * @param {object} req
 * @param {object} res
 */
async function accessDoor(req, res) {
  if (await validator.validate(req)) {
    var msg = await logger.logEntry(req);
    console.log(msg);
    if (msg) {
      res.status(200).send(msg);
    } else {
      res.status(403).send("Access denied - could not record entry");
    }
  } else {
    res.status(403).send("Access denied");
    //throw new Error("Access denied");
  }
}

module.exports = accessDoor;
