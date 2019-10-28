/**
 * Tests for db module, since for select, the access_code table never change during the test, for creation, we return the
 * created entry, so there is no need to set up fresh db every time
 */
const request = require("supertest");
const db = require("../db.js");

describe("Tests for db module", () => {
  it("should return an entry with given id", async done => {
    const response = await db.createEntry(999);
    expect(response.id.toString()).toBe("999");
    done();
  });

  it("should return true since id 123 has an access_code", async done => {
    const response = await db.getAccessCode(123);
    expect(response).toBe(true);
    done();
  });

  it("should return false since id 7890 has no access_code ", async done => {
    const response = await db.getAccessCode(7890);
    expect(response).toBe(false);
    done();
  });

  it("should return false since id abcd is not an integer", async done => {
    const response = await db.createEntry("abcd");
    expect(response).toBe(null);
    done();
  });
});
