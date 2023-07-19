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


router.delete('/:id',async(req,res)=>{
   
try{
   await User.destroy({
     where:{
       id:req.params.id
     }
   }).then((rows)=>{
     res.status(200).json({message:rows+ ' rows(s) affected'})
   })
  }catch(err){
   res.status(500).json({message:err})
  }
});


router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { name: req.body.username } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.logged_in = false;
      req.session.destroy(() => {
        res.status(204).end();
      }); 
    } else {
      res.status(404).end();
    }
  });

module.exports = router;