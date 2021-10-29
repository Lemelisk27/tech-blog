const express = require('express');
const router = express.Router();
const {User,Blog} = require('../models');

router.get("/",(req,res)=>{
    Blog.findAll({
        include:[User]
    }).then(blogData=>{
        const hbsBlog = blogData.map(blogs=>blogs.get({plain:true}))
        res.render("allblogs",{
            blogs:hbsBlog
        })
    })
})

module.exports = router;