const express = require("express");

const server = express();

module.exports = server;

server.get("/", (req, res) => {
    res.send("Hello.")
})