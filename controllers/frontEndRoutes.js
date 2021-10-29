const express = require('express');
const router = express.Router();
const {User,Blog} = require('../models');
const sequelize = require('../config/connection');

router.get("/",(req,res)=>{
    Blog.findAll({
        order:["created_date"],
        include:[User],
        attributes:['id',
        [sequelize.fn('date_format', sequelize.col('created_date'), '%m-%d-%Y'), 'created_date'],
        'title',
        'content']
    }).then(blogData=>{
        const hbsBlog = blogData.map(blogs=>blogs.get({plain:true}))
        res.render("allblogs",{
            blogs:hbsBlog
        })
    })
})

module.exports = router;