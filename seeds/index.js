const seedUsers = require("./user-seeds")
const seedBolgs = require("./blog-seeds")
const seedComments = require("./comment-seeds")

const sequelize = require("../config/connection")

const seedAll = async () => {
    await sequelize.sync({force: true});
    console.log('\n-----DATABASE SYNCED-----\n')
    await seedUsers()
    console.log('\n-----USERS SEEDED-----')
    await seedBolgs()
    console.log('\n-----BLOGS SEEDED-----')
    await seedComments()
    console.log('\n-----COMMENTS SEEDED-----')
    process.exit(0)
}

seedAll()