const express = require("express");
const router = express.Router();
const db = require("../data/helpers/postDb");

// GET - READ
router.get("/", (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "The posts could not be retrieved." });
    });
});

// GET - READ with specific ID
router.get("/:postId", (req, res) => {
  const id = req.params.postId;

  db.get(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post with the specific id does not exist." });
    });
});

// POST - CREATE
router.post("/", (req, res) => {
  const post = req.body;

  if (!post.userId || !post.text) {
    res
      .status(400)
      .json({ error: "Please provide a User ID and text for the post." });
  } else {
    db.insert(post)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  }
});

// DELETE
router.delete("/:postId", (req, res) => {
  const id = req.params.postId;

  db.get(id)
    .then(post => {
      if (post) {
        db.remove(id).then(count => {
          res.status(200).json(post);
        });
      } else {
        res
          .status(404)
          .json({ error: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post with the specified ID does not exist." });
    });
});

// PUT - UPDATE
router.put("/:postId", (req, res) => {
  const id = req.params.postId;
  const changes = req.body;

  db.get(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        db.update(id, changes).then(result => {
          res.status(200).json({ result });
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

module.exports = router;
