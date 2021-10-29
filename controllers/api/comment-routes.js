const router = require('express').Router();
const {User,Blog,Comment} = require("../../models")

router.get('/', (req,res) => {
    Comment.findAll({
        include:[Blog]
    }).then(dbComment=>{
        if(dbComment.length){
            res.json(dbComment)
        }
        else {
            res.status(404).json({message:"No Comments Found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"An Error Occured",err:err})
    })
})

module.exports = router