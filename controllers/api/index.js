const router = require('express').Router()
const commentRoutes = require("./comment-routes")
const blogRoutes = require("./blog-routes")

router.use('/blogs', blogRoutes)
router.use('/comments', commentRoutes)

module.exports = router