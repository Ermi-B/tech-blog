const router = require("express").Router();
const { User, Blog } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const user = await User.findAll({
      include: [{ model: Blog }], // including its associated blog post
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Blog,
        },
      ], // including its associated blog
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({
      name: username,
      password: password,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


module.exports = router;