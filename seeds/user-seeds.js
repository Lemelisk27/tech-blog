const {User} = require("../models")

const userData = [
    {
        first_name: 'Nawra',
        last_name: 'Kappel',
        username: "Nawra123",
        email: 'Nawra@Kappel.com',
        password: 'password'
    },
    {
        first_name: 'Lola',
        last_name: 'Morgenstern',
        username: "Lola123",
        email: 'Lola@Morgenstern.com',
        password: 'password'
    },
    {
        first_name: 'Saodat',
        last_name: 'Chester',
        username: "Saodat123",
        email: 'Saodat@Chester.com',
        password: 'password'
    }
]

const seedUsers = () => User.bulkCreate(userData,{individualHooks:true})

module.exports = seedUsers