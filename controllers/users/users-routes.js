const express = require('express');
const router = express.Router();
const {User,Blog,Comment} = require('../../models');
const sequelize = require('../../config/connection');

router.get("/login",(req,res)=>{
    res.render("login")
})

router.get("/dashboard",(req,res)=>{
    if(!req.session.user){
        return res.status(401).send("Please Login First")
    }
    Blog.findAll({
        where: {
            user_id: req.session.user.id
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
        User.findByPk(req.session.user.id,)
        .then(userData=>{
            const hbsUser = userData.get({plain:true})
            res.render("dashboard",{
                blogs:hbsBlog,
                users:hbsUser
            })
        })
    })
})

router.post("/dashboard",(req,res)=>{
    if(!req.session.user){
        return res.status(401).send("Please Login First")
    }
    Blog.create({
        title:req.body.title,
        content:req.body.content,
        user_id:req.session.user.id
    }).then(newBlog=>{
        res.json(newBlog)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"An Error Occured",err:err})
    })
})

router.get("/dashboard/:id",(req,res)=>{
    if(!req.session.user){
        return res.status(401).send("Please Login First")
    }
    Blog.findOne({
        where: {
            id: req.params.id
        },
        include:[User],
        attributes:{
            include: [
                [sequelize.fn('date_format', sequelize.col('blog_date'), '%m-%d-%Y'), 'blog_date']
            ]
        }
    }).then(blogData=>{
        const hbsBlog = blogData.get({plain:true})
        User.findOne({
            where: {
                id: req.session.user.id
            }
        }).then(userData=>{
            const hbsUser = userData.get({plain:true})
            res.render("userblogbyid",{
                blogs:hbsBlog,
                users:hbsUser
            })
        })
    })
})

router.delete("/dashboard",(req,res)=>{
    if(!req.session.user){
        return res.status(401).send("Please Login First")
    }
    Blog.destroy({
        where: {
            id: req.body.id,
            user_id: req.session.user.id
        }
    }).then(delBlog=>{
        res.json(delBlog)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"An Error Occured",err:err})
    })
})

router.put("/dashboard",(req,res)=>{
    if(!req.session.user){
        return res.status(401).send("Please Login First")
    }
    Blog.update(
        {
            title:req.body.title,
            content:req.body.content
        },
        {
            where: {
                id: req.body.id
            }
        }
    ).then(updateBlog=>{
        res.json(updateBlog)
    }).catch(err=> {
        console.log(err)
        res.status(500).json({message:"An Error Occured",err:err})
    })
})

module.exports = router