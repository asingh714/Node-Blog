const express = require("express");

const db = require("../data/helpers/postDb");

const router = express.Router();

// GET POSTS
router.get("/", (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// GET POSTS w/ Specific ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "The post with the specified ID does not exist."
      });
    });
});

module.exports = router;