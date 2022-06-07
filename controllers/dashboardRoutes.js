const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    // we want to go ahead and finishing the routing to get all the posts
    Post.findAll({
        where: {
          user_id: req.session.user_id
        },
        attributes: [
          'id',
          'title',
          'contents',
          'created_at'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'contents', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(dbPostData => {
          const posts = dbPostData.map(post => post.get({ plain: true }));
          res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

router.get("/new", withAuth, (req, res) => {
    res.render('new-posts');
})

router.get("/edit/:id", withAuth, async (res, req) => {
    // To be able to find posts by primary key and render the edit post on the dashboard
    Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id', 
                     'title',
                     'contents',
                     'created_at'
                  ],
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Comment,
            attributes: ['id', 'contents', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          }
        ]
      })
        .then(dbPostData => {
          if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
            const post = dbPostData.get({ plain: true });
            res.render('edit-posts', {post, loggedIn: true});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
})

module.exports = router;