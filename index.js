let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let GreetRoute = require('./routes/greeting');
let GreetService = require('./services/greetings')
let flash = require('express-flash');
let session = require('express-session');
let pg = require("pg");
let Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://seandamon:Thando2008@localhost:5432/user_greeted';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

let app = express();

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

let greetFunction = GreetService(pool);
let greet = GreetRoute(greetFunction);

app.get('/', greet.home); 
app.post('/greetings', greet.greetings); 
app.get('/greeted', greet.greeted); 
app.get('/reset', greet.reset);
app.get('/perUser/:id_name', greet.counter); 

app.post('/back', async function(req, res){
    res.redirect('/')
});

app.post('/clear', async function(req, res){
    await pool.query('DELETE FROM users;')
    res.render('greeted')
});

app.post('/home', async function(req, res){
    res.redirect('/');
})

let PORT = process.env.PORT || 4040;

app.listen(PORT, function () {
    console.log('App running on port', PORT);
});
