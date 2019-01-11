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

module.exports = router;
