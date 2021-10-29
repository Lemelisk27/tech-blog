const router = require('express').Router();
const {User} = require("../../models")
const bcrypt = require("bcrypt");

router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then(foundUser=>{
        if(!foundUser){
            res.status(401).json({message:"Incorrect Username or Password"})
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
                res.status(401).json({message:"Incorrect Username or Password"})
            }
        }
    })
})

module.exports = router