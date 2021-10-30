const router = require('express').Router();
const {User} = require("../../models")
const bcrypt = require("bcrypt");

router.get("/",(req,res) => {
    User.findAll()
    .then(dbUser=>{
        if(dbUser.length){
            res.json(dbUser)
        }
        else {
            res.status(404).json({message:"No Users Foound"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({messge:"An Error Occured"})
    })
})

router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then(foundUser=>{
        if(!foundUser){
            req.session.destroy()
            res.redirect("/login")
        }
        else {
            if (bcrypt.compareSync(req.body.password,foundUser.password)){
                req.session.user = {
                    username:foundUser.username,
                    email:foundUser.email,
                    id:foundUser.id
                }
                res.json(foundUser)
            }
            else {
                req.session.destroy()
                res.redirect("/login")
            }
        }
    })
})

module.exports = router