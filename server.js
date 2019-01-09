const express = require("express");
const db = require("./data/helpers/userDb");


const server = express();
server.use(express.json());


server.get("/", (req, res) => {
    res.send("Hello.")
})


server.get("/users", (req, res) => {
    db.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ error: "The users could not be retrieved." })
    })
})



module.exports = server;