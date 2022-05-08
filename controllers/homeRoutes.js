const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
    try {
    // get all posts for the homepage
    res.render('posts', { 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/post/:id", async (req, res) => {
    // get a single post
});

router.get("/login", (req, res) => {
    // login
});

router.get("/signup", (req, res) => {
    // signup
})

module.exports = router;