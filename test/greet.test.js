const assert = require('assert');
const Greet = require('../services/greetings');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://seandamon:Thando2008@localhost:5432/user_greeted';


const pool = new Pool({
    connectionString
});

describe('The greetings database web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from users;");
    });

    it('should return all the users count that were greeted', async function(){
        
        // the Factory Function is called Greet
        let greet = Greet(pool);
        await greet.GreetingFunction('Shaun');
        await greet.GreetingFunction('Zwai');
        await greet.GreetingFunction('Zola');
        let greetedUser = await greet.ReadUserData();
        assert.strictEqual(3, greetedUser.length);

    });
    it('should return greeting in language selected', async function(){
        let greet = Greet(pool);
        let greetName = await greet.GreetingFunction('Shaun', 'Hello');

        let greet2 = Greet(pool);
        let greetName2 = await greet2.GreetingFunction('Siya', 'Molo');

        assert.strictEqual(greetName2, 'Molo, Siya');
        assert.strictEqual(greetName, 'Hello, Shaun');
    });
    it('should not greet the same name twice', async function(){
        let greet = Greet(pool);
        await greet.GreetingFunction('Zwai', 'Hello');
        await greet.GreetingFunction('Shaun', 'Molo');
        await greet.GreetingFunction('Shaun', 'Molo');
        await greet.GreetingFunction('Shaun', 'Hello');
        let userCount = await greet.OverallCount();
        assert.equal(2, userCount)
    });
    it('shoul greet the user in Afrikaans', async function(){
        let greet = Greet(pool);

        let greetedUser = await greet.GreetingFunction('Siyamthanda', 'Goie Dag');

        assert.strictEqual(greetedUser, 'Goie Dag, Siyamthanda');
    })
    it('should return the count of the greeted user only', async function(){
        let greet = Greet(pool);
        await greet.GreetingFunction('Shaun', 'Molo');
        await greet.GreetingFunction('Shaun', 'Molo');
        await greet.GreetingFunction('Zwai', 'Molo');
        let greetedUser = await greet.ReadUser('Shaun');
        assert.strictEqual(greetedUser[0].count, 2);
    });

    after(function(){
        pool.end();
    })
});