const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');
var serveIndex = require('serve-index');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const apiRoute = require('./routes/api');


app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS,GET,POST,PUT,PATCH,DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'), { dotfiles: 'allow' }));

app.use('/.well-known', express.static('.well-known'), serveIndex('.well-known'));


app.use('/api', apiRoute);

app.use('/', (req, res) => {

    console.log("404 (Page not found)");
    res.status(404).send({
        "message": "Page not found"
    });

});

sequelize.sync().then(result => {
    // console.log(result);
    console.log("MySQL DB connected...")
    console.log("Sequelize models synced...");

})
    .catch(err => {
        console.log("Error in sequelize syncing " + err);
    });
module.exports = app;