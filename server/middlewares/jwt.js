const expressJwt = require("express-jwt");

module.exports = expressJwt({
  secret: "secret",
  algorithms: ["HS256"],
});
