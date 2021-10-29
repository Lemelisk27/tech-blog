const router = require('express').Router()
const commentRoutes = require("./comment-routes")
const blogRoutes = require("./blog-routes")
const userRoutes = require("./users-routes")
const sessionRoutes = require("./sessionRoutes")

router.use("/sessions",sessionRoutes)
router.use('/blogs', blogRoutes)
router.use('/comments', commentRoutes)
router.use('/users',userRoutes)

module.exports = router