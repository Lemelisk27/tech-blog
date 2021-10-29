const {Blog} = require("../models")

const blogData = [
    {
        title: "MySQL",
        content: "MySQL Can be fun!",
        user_id: 1
    },
    {
        title: "Node.js",
        content: "Node.js Can be fun!",
        user_id: 2
    },
    {
        title: "Sequelize",
        content: "Sequelize Can be fun!",
        user_id: 3
    },    
]

const seedBolgs = () => Blog.bulkCreate(blogData)

module.exports = seedBolgs