const { app } = require("./app");

const port = process.env.NODE_ENV == "test" ? 3001 : 8080;

app.listen(port);
