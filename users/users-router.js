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





module.exports = router;
