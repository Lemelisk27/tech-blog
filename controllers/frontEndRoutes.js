const express = require('express');
const router = express.Router();
const {User,Blog,Comment} = require('../models');
const sequelize = require('../config/connection');

router.get("/",(req,res)=>{
    let loggedIn = false
    if(req.session.user) {
        loggedIn = true
    }
    Blog.findAll({
        order:["blog_date"],
        include:[User],
        attributes:{
            include: [
                [sequelize.fn('date_format', sequelize.col('blog_date'), '%m-%d-%Y'), 'format_date']
            ]
        }
    }).then(blogData=>{
        const hbsBlog = blogData.map(blogs=>blogs.get({plain:true}))
        res.render("allblogs",{
            blogs:hbsBlog,
            loggedIn:loggedIn
        })
    })
})

router.get("/blogs/:id",(req,res)=>{
    let loggedIn = false
    if(req.session.user) {
        loggedIn = true
    }
    Blog.findAll({
        where: {
            id: req.params.id
        },
        order:["blog_date"],
        include:[User],
        attributes:{
            include: [
                [sequelize.fn('date_format', sequelize.col('blog_date'), '%m-%d-%Y'), 'blog_date']
            ]
        }
    }).then(blogData=>{
        const hbsBlog = blogData.map(blogs=>blogs.get({plain:true}))
        Comment.findAll({
            where: {
                blog_id: req.params.id
            },
            order:["comment_date"],
            include:[User],
            attributes:{
                include: [
                    [sequelize.fn('date_format', sequelize.col('comment_date'), '%m-%d-%Y'), 'comment_date']
                ]
            }
        }).then(commentData=>{
            const hbsComment = commentData.map(comments=>comments.get({plain:true}))
            res.render("blogsbyid",{
                blogs:hbsBlog,
                comments:hbsComment,
                loggedIn:loggedIn
            })
        })        
    })
})

router.post("/blogs",(req,res)=>{
    if(!req.session.user){
        return res.status(401).send("Please Login First")
    }
    Comment.create({
        comment:req.body.comment,
        blog_id:req.body.blog_id,
        user_id:req.session.user.id
    }).then(newComment=>{
        res.json(newComment)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"An Error Occured",err:err})
    })
})

module.exports = router;