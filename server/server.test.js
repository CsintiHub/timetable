import request from "supertest";
const models = jest.createMockFromModule("./models");
// const supertest = require("supertest");
// const request = require("supertest");
const { app } = require("./server");

// beforeEach/All(() => {
//   initializeDatabase();
// });

// afterEach(() => {
//   clearDatabase();
// });

// expect().not.toBe(), object/array: .toEqual(), toContain()
// toBeNull, toBeUndefined, toBeDefined, toBeTruthy, toBeFalsy
// expect(fn).toThrow(error)
// const data = await fetchData()
test("logout test", async () => {
  const res = await request(app).get("/api/logout");
  expect(res.statusCode).toBe(200);
  // console.log(res);
  expect(res.text).toMatch("logged out");
  return;
});

describe("/api/login test", () => {
  it("fails with no credentials", async () => {
    const res = await request(app).post("/api/login");
    expect(res.statusCode).toBe(400);
    return;
  });
  it("logs in with credentials", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "gj@", password: "titok" });
    expect(res.statusCode).toBe(200);
    return;
  });
});
