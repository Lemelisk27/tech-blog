const express = require('express');
const sequelize = require("./config/connection.js")
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({});

const {User,Blog,Comment} = require('./models');
const routes = require("./controllers")

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes)

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`);
    });
});