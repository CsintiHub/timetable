var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            tutor INTEGER,
            subject text,
            address text,
            CONSTRAINT email_unique UNIQUE (email)
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO user (name, email, password) VALUES (?,?,?)";

          db.get("SELECT id FROM user where id=1;", (err, row) => {
            if (err) {
              return console.log(err.message);
            } else if (row.id !== 1) {
              // console.log(row);

              db.run(insert, ["admin", "admin@com", "admin"]);
              db.run(insert, ["user", "user@com", "user"]);
            }
          });
        }
      }
    );
  }
});

module.exports = db;
