const express = require("express");


const usersRouter = require("../users/usersRoutes");

const server = express();

// MIDDLEWARE
server.use(express.json());
server.use("/users", usersRouter)


// Display Hello to homepage.
server.get("/", (req, res) => {
  res.send("Hello.");
});



module.exports = server;