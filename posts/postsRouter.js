const express = require("express")
const router = express.Router();
const db = require("../data/helpers/postDb")


// GET - READ 
router.get("/", (req, res) => {
    db.get()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({ error: "The posts could not be retrieved." });
    })
})




module.exports = router;