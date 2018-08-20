let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let Greet = require('./Greet');
let flash = require('express-flash');
let session = require('express-session');

let app = express();
let greet = Greet();

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

app.post('/greetings', function(req, res){
    let text = req.body.greetTextArea;
    let language = req.body.languageSelector;

    greet.greetingFunction(text, language);

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
