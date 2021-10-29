const express = require('express');
const router = express.Router();
const {User,Blog,Comment} = require('../../models');
const sequelize = require('../../config/connection');

router.get("/login",(req,res)=>{
    res.render("login")
})

module.exports = router