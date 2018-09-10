let greetRoute = require('../servicesDB/greetingDB');

module.exports = function(pool){
    let greet = greetRoute(pool);

    async function index(req, res){
        try{
            let count = await greet.countUsers()
            res.render('home', { count });
        }
        catch(err){

        }
    }

    async function greetings(req, res){
        try{
            let text = req.body.greetTextArea;
            let Name = text.toUpperCase();
            let Language = req.body.languageSelector;
        
            if (Name === '' && Language === undefined) {
                req.flash('info', 'Please Enter Name & Select Language')
            }
            else if (Language === undefined) {
                req.flash('info', 'Please Select Language');
            }
            else if (Name === '') {
                req.flash('info', 'Please Enter Name :')
            }
            else if (isNaN(Name)) {
                await greet.greetingFunction(Name, Language);
                req.flash('info', Language + ', ' + Name);
            }
            res.redirect('/');
        }
        catch(err){

        }
    }

    async function greeted(req, res){
        try{
          let user = await greet.readUserData();
          res.render('greeted', {user})
        }
        catch(err){

        }
    }

    async function counter(req, res){
        try {
            let id_name = req.params.id_name;
            let outcome = await greet.readUser(id_name);
    
            res.render('names', {
                howManyTimes: outcome
            });
        } catch (err) {
            res.send(err.stack)
        }   
    }

    async function Reset(req, res){
        try{
            await greet.resetData();
            res.redirect('/')
        }
        catch(err){

        }
    }
    return {
        greeted,
        greetings,
        index,
        counter,
        Reset
    }
}