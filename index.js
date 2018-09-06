let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let Greet = require('./Greet');
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

// let pool = new Pool({
//     user: 'seandamon',
//     host: 'localhost',
//     database: 'user_greeted',
//     password: 'Thando@2008',
//     port: 5432,
// });

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


app.get('/', async function (req, res) {
    let greeting = greet.returnGreeting();
    let count = await pool.query('select count(id_name ) from users;');
    count = count.rows[0].count;

    res.render('home', {
        greeting,
        count
    });
});

app.post('/greetings', async function (req, res) {
    let text = req.body.greetTextArea;
    let language = req.body.languageSelector;

    if (text === '' && language === undefined) {
        req.flash('info', 'Please Enter Name & Select Language')
    }
    else if (language === undefined) {
        req.flash('info', 'Please Select Language');
    }
    else if (text === '') {
        req.flash('warning', 'Please Enter Name :')
    }
    else {

        let user = await pool.query('SELECT * FROM users WHERE id_name=$1', [text])
        if (user.rows.length != 0) {
            let currentCount = await pool.query('SELECT count FROM users WHERE id_name = $1', [text]);
            let initialCount = currentCount.rows[0].count + 1;
            await pool.query('UPDATE users SET count=$1 WHERE id_name=$2', [initialCount, text]);
        }
        else {
            await pool.query('INSERT INTO users (id_name, count) values ($1, $2)', [text, 1])
        }
        // greet.returnGreeting();
        greet.greetingFunction(text, language);
    }

    res.redirect('/');
})

app.get('/greeted', async function (req, res) {
    let outcome = await pool.query('SELECT * FROM users;');
    let usersGreeted = outcome.rows;
    res.render('greeted', { usersGreeted });
})

app.post('/reset', async function (req, res) {
    await pool.query('DELETE FROM users;');
    greet.reset();
    // req.flash('info', 'All data cleared out!');
    res.redirect('/');
})

app.get('/perUser/:id_name', async function (req, res) {
    try {
        let id_name = req.params.id_name;
        let outcome = await pool.query('SELECT * FROM users WHERE id_name=$1', [id_name]);

        res.render('names', {
            howManyTimes: outcome.rows
        });
    } catch (err) {
        res.send(err.stack)
    }
})



let PORT = process.env.PORT || 4040;

app.listen(PORT, function () {
    console.log('App running on port', PORT);
});
