const models = jest.createMockFromModule("./models");
const supertest = require("supertest");
// const request = require("supertest");
const app = require("./server");

// beforeEach/All(() => {
//   initializeDatabase();
// });

// afterEach(() => {
//   clearDatabase();
// });

models.describe("test", () => {});

// expect().not.toBe(), object/array: .toEqual(), toContain()
// toBeNull, toBeUndefined, toBeDefined, toBeTruthy, toBeFalsy
// expect(fn).toThrow(error)
// const data = await fetchData()
test("'/' test", async () => {
  const res = await supertest(app).get("/");
  expect(res.statusCode).toBe(200);
  // expect(res.body).toMatch("myVal");
  return;
});

describe("login", () => {
  it("no credentials given", async () => {
    const res = await supertest(app).post("/login");
    expect(res.statusCode).toBe(400);
    return;
  });
});
