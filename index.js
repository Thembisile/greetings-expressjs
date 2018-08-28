let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let Greet = require('./Greet');
let flash = require('express-flash');
let session = require('express-session');
let pg = require("pg");
let Pool = pg.Pool;


// let useSSL = false;
// let local= process.env.LOCAL || false;
// if (process.env.DATABASE_URL && !local) {
//     useSSL = true;
// }
//let connectionString = process.env.DATABASE_URL || 'seandamon:Thando@2008@postgresql://localhost:5432/user_greeted';

let pool = new Pool({
    user: 'seandamon',
    host: 'localhost',
    database: 'user_greeted',
    password: 'Thando@2008',
    port: 5432,
});

let app = express();
let greet = Greet();

app.use(session({
    secret: 'keyboard us3rs',
    resave: false,
    saveUninitialized: true
}));

app.engine('handlebars', exphbs(
    {
        defaultLayout: 'main'
    }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(flash());
app.use(session({
    secret: "bill",
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', function(req, res){
    let greeting = greet.returnGreeting();
    let counter = greet.greetCounter();

    res.render('home', {
        greeting,
        counter
    });
});

app.post('/greetings', async function(req, res){
    let text = req.body.greetTextArea;
    let language = req.body.languageSelector;

    if (text && language !== undefined)  {
        await pool.query('insert into users (id_name, count) values ($1, $2)', [text, 1])
    }

    res.redirect('/');
})

app.post('/reset', function (req, res) {
    greet.reset();
    // req.flash('warning', 'All data cleared out!');
    res.redirect('/');
})



let PORT = process.env.PORT || 4040;

app.listen(PORT, function () {
    console.log('App running on port', PORT);
});
