const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const apiRoute = require('./routes/api');





app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'), { dotfiles: 'allow' }));




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