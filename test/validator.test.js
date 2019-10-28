/**
 * Tests for validator module,
 */
const request = require("supertest");
const validator = require("../validator.js");

describe("Tests for validator module", () => {
  it("should return false as there is no id", async done => {
    const mockRequest = {
      params: {
        name: "Joe"
      }
    };
    const response = await validator.validate(mockRequest);
    expect(response).toBe(false);
    done();
  });

  it("should return false as the id is not integer", async done => {
    const mockRequest = {
      params: {
        id: "abcd",
        name: "Joe"
      }
    };
    const response = await validator.validate(mockRequest);
    expect(response).toBe(false);
    done();
  });

  it("should return false as the name is not allowed", async done => {
    const mockRequest = {
      params: {
        id: 1234,
        name: "Jon"
      }
    };
    const response = await validator.validate(mockRequest);
    expect(response).toBe(false);
    done();
  });

  it("should return true", async done => {
    const mockRequest = {
      params: {
        id: 1234,
        name: "Joe"
      }
    };
    const response = await validator.validate(mockRequest);
    expect(response).toBe(true);
    done();
  });

  it("should return true, id with access code", async done => {
    const mockRequest = {
      params: {
        id: 123,
        name: "Jon"
      }
    };
    const response = await validator.validate(mockRequest);
    expect(response).toBe(true);
    done();
  });
});
