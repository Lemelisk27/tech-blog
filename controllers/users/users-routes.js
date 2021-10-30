const express = require('express');
const router = express.Router();
const {User,Blog,Comment} = require('../../models');
const sequelize = require('../../config/connection');

router.get("/login",(req,res)=>{
    let loggedIn = false
    if(req.session.user) {
        loggedIn = true
    }
    res.render("login",{
        loggedIn:loggedIn
    })
})

router.get("/logout",(req,res)=>{
    req.session.destroy()
    res.redirect("/users/login")
})

router.get("/signup",(req,res)=>{
    let loggedIn = false
    if(req.session.user) {
        loggedIn = true
    }
    res.render("signup",{
        loggedIn:loggedIn
    })
})

router.post("/signup",(req,res)=>{
    req.session.destroy()
    User.create({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
    }).then(newUser=>{
        res.json(newUser)
        res.redirect("/users/login")
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"An Error Occured",err:err})
    })
})

router.get("/dashboard",(req,res)=>{
    let loggedIn = false
    if(req.session.user) {
        loggedIn = true
    }
    if(!req.session.user){
        res.redirect("/users/login")
        return
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
                users:hbsUser,
                loggedIn:loggedIn
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

router.get("/dashboard/:id",(req,res)=>{
    let loggedIn = false
    if(req.session.user) {
        loggedIn = true
    }
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
                users:hbsUser,
                loggedIn:loggedIn
            })
        })
    })
})

module.exports = router