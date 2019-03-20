const express = require("express");

const db = require("../data/helpers/userDb");

const router = express.Router();

// GET USERS
router.get("/", (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved. " });
    });
});

module.exports = router;
