const express = require('express');
const sequelize = require("./config/connection.js")
const app = express();
const PORT = process.env.PORT || 3000;

const {User,Blog,Comment} = require('./models');
const routes = require("./controllers")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes)

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`);
    });
});