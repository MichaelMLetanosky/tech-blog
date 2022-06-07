const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    // create a router to post comments to created posts
    if (req.session) {
        Comment.create({
            contents: req.body.contents, 
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
        }
});

module.exports = router;