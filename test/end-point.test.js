/**
 * Tests for end endpoint, with different id and name combinations
 */
const request = require("supertest");
const app = require("../app");

describe("Tests with id and name cases", () => {
  it("should responsd with 403, since there is no name, and id has no access code in db", async done => {
    const response = await request(app).get("/1234");
    expect(response.statusCode).toBe(403);
    done();
  });

  it("should respond with 403, with name, but not allowed name", async done => {
    const response = await request(app).get("/1234/Jack");
    expect(response.statusCode).toBe(403);
    done();
  });

  it("should respond with 200, with id and allowed name", async done => {
    const response = await request(app).get("/1234/Joe");
    expect(response.statusCode).toBe(200);
    done();
  });

  it("should respond with 200, with id, no name, but id has access code", async done => {
    const response = await request(app).get("/123");
    expect(response.statusCode).toBe(200);
    done();
  });

  it("should respond with 200, with id and not allowed name, but id has access code", async done => {
    const response = await request(app).get("/123/Jack");
    expect(response.statusCode).toBe(200);
    done();
  });

  it("should respond with 403, with a none integer id", async done => {
    const response = await request(app).get("/id123/Joe");
    expect(response.statusCode).toBe(403);
    done();
  });
});
