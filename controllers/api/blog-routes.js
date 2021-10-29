const router = require('express').Router();
const {User,Blog,Comment} = require("../../models")

router.get('/', (req,res) => {
    Blog.findAll({
        include:[Comment,User]
    }).then(dbComment=>{
        if(dbComment.length){
            res.json(dbComment)
        }
        else {
            res.status(404).json({message:"No Blogs Found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"An Error Occured",err:err})
    })
})

module.exports = router