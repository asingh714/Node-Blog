const express = require("express");
const db = require("./data/helpers/userDb");


const server = express();
server.use(express.json());


server.get("/", (req, res) => {
    res.send("Hello.")
})

// GET - READ
server.get("/users", (req, res) => {
    db.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ error: "The users could not be retrieved." })
    })
})


// GET - READ with specific ID
server.get("/users/:userId", (req, res) => {
    const id = req.params.userId

    db.get(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ error: "The user with the specific ID does not exist." })
    })
})



module.exports = server;