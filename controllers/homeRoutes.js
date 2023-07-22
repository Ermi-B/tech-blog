const router = require("express").Router();
const { User, Blog,Comment } = require("../models");
const withAuth = require('../utils/withAuth')
router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    include: [{ model: User }],
  });

  const blog = blogs.map((item) => item.get({ plain: true }));
  
  res.render("homepage", {
    blog,
    logged_in: req.session.logged_in,
  });
});

router.get("/blog/:id", async (req, res) => {
  const blogs = await Blog.findByPk(req.params.id, {
    include: [
      { model: User },
      {
        model:Comment,
        include:[
          {
            model:User
          }
    ]
    }],
  });

  const blog = blogs.get({ plain: true });
  const blogComments = blogs.get({ plain: true }).comments;
  console.log(blogComments)
  res.render("blog", {
    blog,
    blogComments,
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
      
       res.render("dashboard", {
      blog,
      logged_in: req.session.logged_in,
    });
    });

  } catch (error) {
    console.log(error);
  }
});

router.get('/dashboard/create',async(req,res)=>{
  try {
    const user_id = req.session.user_id
    const blogs = await User.findByPk(user_id, {
      include: [{ model: Blog }],
      attributes:{exclude:["password"]}
    }).then((user) => {
      if (!user) {
        console.log("no user found");
        return;
      }
      const blog = user.get({ plain: true });
     
       res.render("create", {
      blog,
      logged_in: req.session.logged_in,
    });
    });

  } catch (error) {
    console.log(error);
  }
});


router.get('/dashboard/edit/:id',async(req,res)=>{
  try {
    const blog_id = req.params.id
    const blogs = await Blog.findByPk(blog_id, {}).
    then((result) => {
      if (!result) {
        console.log("no user found");
        return;
      }
      const blog = result.get({ plain: true });
      
       res.render("edit", {
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
