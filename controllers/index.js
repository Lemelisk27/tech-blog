const router = require('express').Router();
const apiRoutes = require("./api")
const frontEndRoutes = require("./frontEndRoutes")
const userRoutes = require("./users")

router.use(frontEndRoutes)
router.use('/api', apiRoutes)
router.use('/users', userRoutes)

module.exports = router