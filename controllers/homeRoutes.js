const router = require("express").Router();
const { User, Blog } = require("../models");
const withAuth = require('../utils/withAuth')
router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    include: [{ model: User }],
  });

  const blog = blogs.map((item) => item.get({ plain: true }));
  console.log(blog);
  res.render("homepage", {
    blog,
    logged_in: req.session.logged_in,
  });
});

router.get("/blog/:id", async (req, res) => {
  const blogs = await Blog.findByPk(req.params.id, {
    include: [{ model: User }],
  });

  const blog = blogs.get({ plain: true });
  console.log(blog);
  res.render("blog", {
    blog,
    logged_in: req.session.logged_in,
  });
});

router.get("/dashboard", withAuth,async (req, res) => {
  try {
    const user_id = req.session.user_id
    const blogs = await User.findByPk(user_id, {
      include: [{ model: Blog }],
    }).then((user) => {
      if (!user) {
        console.log("no user found");
        return;
      }
      const blog = user.get({ plain: true }).blogs;
      console.log(blog)
       res.render("dashboard", {
      blog,
      logged_in: req.session.logged_in,
    });
    });

  } catch (error) {
    console.log(error);
  }
});

router.get("/login", async (req, res) => {
  res.render("login", {});
});

module.exports = router;
