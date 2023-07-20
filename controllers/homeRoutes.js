const router = require('express').Router();
const {  User, Blog } = require('../models');

router.get('/', async (req,res)=>{
    const blogs = await Blog.findAll({
        include:[{model:User}]
    })
    
    const blog = blogs.map((item)=>item.get({plain:true}))
    console.log(blog)
    res.render('homepage',{
        blog,
        logged_in:req.session.logged_in
    })
});

router.get('/blog/:id', async(req,res)=>{
    const blog = await Blog.findByPk(req.params.id,{
        
    })

    res.render('blog',{
        blog
    })
});

router.get('/dashboard', async(req,res)=>{
    res.render('dashboard',{})
});

router.get('/login', async(req,res)=>{
    res.render('login',{})
});

module.exports = router