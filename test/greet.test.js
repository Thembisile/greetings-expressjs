const assert = require('assert');
const Greet = require('../Greet');
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

    it('should return the length for each user greeted', async function(){
        
        // the Factory Function is called Greet
        let greet = Greet(pool);
        await greet.greetingFunction('Shaun');
        await greet.greetingFunction('Zwai');
        await greet.greetingFunction('Zola');
        let greetedUser = await greet.readUserData();
        assert.equal(3, greetedUser.length);

    });
    it('should  should return the number of greeted users in datatbase', async function(){
        let greet = Greet(pool);
        await greet.greetingFunction('Shaun');
        await greet.greetingFunction('Shaun');
        let greetCount = await greet.readUser('Shaun');
        assert.equal(greetCount[0].count, 2);

        let greet2 = Greet(pool);
        await greet2.greetingFunction('Siya');
        await greet2.greetingFunction('Siya');
        await greet2.greetingFunction('Siya');
        await greet2.greetingFunction('Siyabonga')
        let greetCount2 = await greet2.readUser('Siyabonga')
        assert.equal(greetCount2[0].count, 1)
    });
    it('should return greeting in language selected', async function(){
        let greet = Greet(pool);
        await greet.greetingFunction('Shaun', 'English');
        let greetName = await greet.returnGreeting();
        assert.equal(greetName, 'Hello, Shaun')

    })

    after(function(){
        pool.end();
    })
});