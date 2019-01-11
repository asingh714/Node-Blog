const express = require("express");
const router = express.Router();
const db = require("../data/helpers/userDb");



const uppercase = require("../middleware/uppercaseMiddleware");


  
// GET - READ
router.get("/", (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "The users could not be retrieved." });
    });
});

// GET - READ with specific ID
router.get("/:userId", (req, res) => {
  const id = req.params.userId;

  db.get(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user with the specific ID does not exist." });
    });
});

// POST - CREATE
router.post("/", uppercase, (req, res) => {
  const user = req.body;

  if (!user.name) {
    res.status(400).json({ error: "Please provide a name for the user." });
  } else if (user.name.length > 128) {
    res
      .status(400)
      .json({ error: "Please provide a name that is under 129 characters." });
  } else {
    db.insert(user)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: "There was an error while saving the user to the database"
          });
      });
  }
});

// DELETE
router.delete("/:userId", (req, res) => {
  const id = req.params.userId;

  db.get(id)
    .then(user => {
      if (user) {
        db.remove(id).then(count => {
          res.status(200).json(user);
        });
      } else {
        res
          .status(404)
          .json({ error: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed." });
    });
});

// PUT - UPDATE
router.put("/:userId", uppercase, (req, res) => {
  const id = req.params.userId;
  const changes = req.body;

  db.get(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      if (!changes.name) {
        res.status(400).json({ error: "Please provide a name for the user." });
      }
      db.update(id, changes).then(result => {
        res.status(200).json({ result });
      });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});



module.exports = router;