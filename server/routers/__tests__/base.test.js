import encodings from "../../node_modules/iconv-lite/encodings";
import { getCodec } from "../../node_modules/iconv-lite/lib";
getCodec("UTF-8");
import { app } from "../../app";
import request from "supertest";
// import User from "../../models/user";

import User, { mockFindOne } from "../../models/user";
jest.mock("../../models/user");

beforeEach(() => {
  User.mockClear();
  mockFindOne.mockClear();
});

// jest.mock("../../models");
jest.mock("../../models/user");

describe("i am", () => {
  it("done", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "admin@com", password: "admin" });
    expect(res.statusCode).toBe(200);
    // expect(res.body).not.toBeNull;
    return;
  });
});

describe("api/test", () => {
  it("works", async () => {
    const res = await request(app).get("/api/test");
    expect(res.statusCode).toBe(200);
    return;
  });
});
