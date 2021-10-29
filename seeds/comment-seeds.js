const {Comment} = require("../models")

const commentData = [
    {
        comment: "No it isn't!",
        blog_id: 1,
        user_id: 3
    },
    {
        comment: "Yes it is!",
        blog_id: 1,
        user_id: 1
    },
    {
        comment: "Meh, sometimes",
        blog_id: 2,
        user_id: 1
    },
    {
        comment: "No, it is!",
        blog_id: 2,
        user_id: 2
    },
    {
        comment: "Blech",
        blog_id: 3,
        user_id: 1
    },
    {
        comment: "Dude!",
        blog_id: 3,
        user_id: 3
    }
]

const seedComments = () => Comment.bulkCreate(commentData)

module.exports = seedComments