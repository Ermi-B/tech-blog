const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require('../../utils/withAuth')

router.get("/", async (req, res) => {
    try {
      const comments = await Comment.findAll({});
      if (comments.length === 0) {
        res.status(404).json({ message: "no comment found!" });
        return;
      }
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });


router.post("/", async (req, res) => {
  try {
    const { content, user_id, blog_id } = req.body;
    const comment = await Comment.create({
      
      content: content,
      user_id:user_id,
      blog_id:blog_id
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});





module.exports = router;
