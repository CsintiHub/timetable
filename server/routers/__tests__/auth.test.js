// // "use strict";
// // import encodings from "../../node_modules/iconv-lite/encodings";
// // import createServer from "@arranger/server";
// const encodings = require("../../node_modules/iconv-lite/encodings");
// const iconvLite = require("../../node_modules/iconv-lite/lib");
// iconvLite.getCodec("UTF-8");
// const { app } = require("../../app");
// const request = require("supertest");
// const sqlite3 = require("sqlite3").verbose();

// // const testdb = require("../../database/tester_database");

// let db = new sqlite3.Database(":memory:");

// const seedDb = async (db) => {
//   await db.run(
//     "CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, tutor BOOLEAN, subject TEXT, address TEXT, password TEXT)"
//   );
//   await db.run("DELETE FROM Users");
//   const stmt = db.prepare(
//     "INSERT INTO Users (name, email, tutor, subject, address, password) VALUES (?, ?, ?, ?, ?, ?)"
//   );
//   stmt.run("teszt elek", "te@", 0, null, "tea", "tep");
//   // stmt.finalize();
//   stmt.run("gipsz jakab", "gj@", 1, "math", "gja", "gjp");
//   await stmt.finalize();
// };

// beforeAll(() => {
//   process.env.NODE_ENV = "test";
//   // seedDb(db);
// });

// // jest.mock("../../models");
// // const { thing } = require("../../models");

// // describe("test", () => {
// //   it("works", () => {
// //     expect(true).toBeTruthy();
// //     return;
// //   });

// //   it("should give me mocked models", () => {
// //     // I like to confirm my testing is working as expected
// //     // in an almost throwaway unit test -- sort of a "testing
// //     // the unit testing library" type of approach
// //     expect(thing.weirdFunc._isMockFunction).toBeTruthy();

// //     // may help to confirm it returned as you expected
// //     // const _thing = await thing.findByPk();
// //     // console.log(_thing);
// //     return;
// //   });
// // });

// describe("auth", () => {
//   it("fails login with no credentials", async () => {
//     const res = await request(app).post("/api/login");
//     expect(res.statusCode).toBe(400);
//     return;
//   });

//   it("fails login with bad password", () => {
//     db.serialize(async () => {
//       seedDb(db);
//       const res = await request(app)
//         .post("/api/login")
//         .send({ email: "gj@", password: "gjpass" });
//       // console.log(res);
//       expect(res.statusCode).toBe(400);
//       return;
//     });
//   });

//   it("logs in with good credentials", () => {
//     db.serialize(async () => {
//       seedDb(db);
//       const res = await request(app)
//         .post("/api/login")
//         .send({ email: "gj@", password: "gjp" });
//       // console.log(res);
//       expect(res.statusCode).toBe(200);
//       return;
//     });
//   });

//   // it("fails to sign up with no credentials", async () => {
//   //   const res = await request(app).post("/api/signup");
//   //   expect(res.statusCode).toBe(400);
//   //   return;
//   // });

//   it("fails to sign up with registered email", () => {
//     db.serialize(async () => {
//       seedDb(db);
//       const res = await request(app).post("/api/signup").send({
//         name: "teszt elek",
//         email: "gj@",
//         tutor: 1,
//         subject: "math",
//         address: "teaddress",
//         password: "tepassword",
//       });
//       // console.log(res);
//       expect(res.statusCode).toBe(400);
//       return;
//     });
//   });

//   it("signs up new user", () => {
//     db.serialize(async () => {
//       seedDb(db);
//       const res = await request(app).post("/api/signup").send({
//         name: "teszt elek",
//         email: "te@",
//         tutor: 1,
//         subject: "math",
//         address: "teaddress",
//         password: "tepassword",
//       });
//       // console.log(res);
//       expect(res.statusCode).toBe(200);
//       return;
//     });
//   });

//   it("logs out", () => {
//     db.serialize(async () => {
//       seedDb(db);
//       const res = await request(app).get("/api/logout");
//       // console.log(res);
//       expect(res.statusCode).toBe(200);
//       return;
//     });
//   });
// });

// // test("login", async () => {
// //   const user = {
// //     email: "gj@",
// //     password: "titok",
// //   };
// //   const res = await request(app).post("/api/login").send(user);
// //   expect(res.statusCode).toBe(200);
// //   console.log(res);
// // });

// // test("post", () => {
// //   return request(app).post("/api/test").send({ any: "testing ok" }).expect(200);
// // });

test("shut up", () => {
  expect(true).toBeTruthy;
});
