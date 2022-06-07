const router = require("express").Router();
const { Post, Comment, User } = require("../models");

router.get("/", async (req, res) => {
  // get all posts for the homepage
  Post.findAll({
    attributes: ["id", "title", "contents", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "contents", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("main", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/post/:id", async (req, res) => {
  // get a single post
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "contents", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "contents", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });

      console.log(post);
      res.render("single-posts", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  // login
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  // signup
  res.render("signup");
});

module.exports = router;
