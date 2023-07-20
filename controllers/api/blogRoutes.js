const router = require("express").Router();
const { User, Blog } = require("../../models");
const withAuth = require('../../utils/withAuth')
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll({});
    if (blogs.length === 0) {
      res.status(404).json({ message: "no blog found!" });
      return;
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { id: req.params.id },
    });
    if (blogs.length === 0) {
      res.status(404).json({ message: "no blog found!" });
      return;
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const { title, content, user_id } = req.body;
    const newBlog = await Blog.create({
      title: title,
      content: content,
      user_id:user_id
    });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:id",withAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);
    if (!blog) {
      res.status(404).json({ message: "blog not found" });
    } else {
      await blog.destroy();
      res.status(200).json({ message: "blog deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put("/:id",withAuth, async (req, res) => {

  const { title, content } = req.body;
  try {
    const blog = await Blog.findOne({
      where: { id:req.params.id },
    });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    
    await blog.update({ title, content });

   
    return res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {}
});


module.exports = router;
