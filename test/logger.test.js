/**
 * Tests for logger module,
 */
const request = require("supertest");
const logger = require("../logger.js");

describe("Tests for logger module", () => {
  it("should return null as there is no id", async done => {
    const mockRequest = {
      params: {
        name: "Joe"
      }
    };
    const response = await logger.logEntry(mockRequest);
    expect(response).toBe(null);
    done();
  });

  it("should return null as the id is not an integer", async done => {
    const mockRequest = {
      params: {
        id: "id_abc",
        name: "Joe"
      }
    };
    const response = await logger.logEntry(mockRequest);
    expect(response).toBe(null);
    done();
  });

  it("should return an entry object", async done => {
    const mockRequest = {
      params: {
        id: 100,
        name: "Joe"
      }
    };
    const response = await logger.logEntry(mockRequest);
    expect(response).not.toBe(null);
    expect(response.id.toString()).toBe("100");
    done();
  });
});
