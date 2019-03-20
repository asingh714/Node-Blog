const express = require("express");

const db = require("../data/helpers/userDb");

const router = express.Router();

const uppercase = require("../custom_middleware/uppercaseMiddleware");

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

// GET USERS BY ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.getById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ error: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user with the specified ID does not exist." });
    });
});

// GET LISTS OF POSTS BY USER
router.get("/posts/:id", (req, res) => {
  const { id } = req.params;

  db.getUserPosts(id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res
          .status(404)
          .json({ error: "The posts for the specified ID do not exist" });
      }
    })
    .catch(error => {
      res.status(500).json({
        error:
          "The list of posts by the user with the specified ID does not exist."
      });
    });
});

// POST USER
router.post("/", uppercase, (req, res) => {
  const user = req.body;

  if (!user.name) {
    res.status(400).json({
      error: "Please provide a name for the user."
    });
  } else {
    db.insert(user)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  }
});





module.exports = router;
