const {Comment} = require("../models")

const commentData = [
    {
        comment: "No it isn't!",
        created_date: '2021-10-02',
        blog_id: 1,
        user_id: 3
    },
    {
        comment: "Yes it is!",
        created_date: '2021-10-03',
        blog_id: 1,
        user_id: 1
    },
    {
        comment: "Meh, sometimes",
        created_date: '2021-10-04',
        blog_id: 2,
        user_id: 1
    },
    {
        comment: "No, it is!",
        created_date: '2021-10-05',
        blog_id: 2,
        user_id: 2
    },
    {
        comment: "Blech",
        created_date: '2021-10-06',
        blog_id: 3,
        user_id: 1
    },
    {
        comment: "Dude!",
        created_date: '2021-10-07',
        blog_id: 3,
        user_id: 3
    }
]

const seedComments = () => Comment.bulkCreate(commentData)

module.exports = seedComments