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

// POST A POST
router.post("/", (req, res) => {
  const post = req.body;

  if (!post.text && !post.user_id) {
    res.status(400).json({
      errorMessage: "Please provide text and a user_id for the post."
    });
  } else {
    db.insert(post)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

// PUT A POST
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.getById(id).then(post => {
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
    if (!changes.text) {
      res.status(400).json({
        errorMessage: "Please provide text for the post."
      });
    }

    db.update(id, changes)
      .then(result => {
        res.status(200).json({ result });
      })
      .catch(error => {
        res.status(500).json({
          error: "The post information could not be modified."
        });
      });
  });
});



module.exports = router;