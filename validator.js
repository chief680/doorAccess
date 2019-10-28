/**
 * validator module
 * @module validator
 */

var db = require("./db.js");

var dotenv = require("dotenv");

//allowed name is stored in an env variable, so can be changed quickly
dotenv.config();
const allowedName = process.env.PERSON_NAME;

const Validator = {
  /**
   * Validate based on the following rules:
   * if the request has an id and:
   *  - if the person has name "Joe", the person is allowed; or:
   *  - if a person has an valid access code in DB, the person is allowed
   *
   * @param {object} req
   * @returns {boolean} true or false
   */
  async validate(req) {
    if (req.params.id && !isNaN(req.params.id)) {
      //has id
      if (req.params.name == allowedName) {
        //name is allowed
        return true;
      } else {
        //see if the id has an access code
        let hasAccessCode = await db.getAccessCode(req.params.id);

        return hasAccessCode;
      }
    }
    return false;
  }
};

module.exports = Validator;
