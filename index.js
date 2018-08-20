let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
// let Greet = require('./Greet');

let app = express();
// let greet = Greet();

app.engine('handlebars', exphbs(
    {
        defaultLayout: 'main'
    }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res){


    res.render('home');
})







let PORT = process.env.PORT || 4040;

app.listen(PORT, function () {
    console.log('App running on port', PORT);
});
