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

    it('should pass the db test', async function(){
        
        // the Factory Function is called Greet
        let greet = Greet(pool);
        // await greet.add({
        //     description : "Diary"
        // });

        // let categories = await greet.all();
        assert.equal(undefined, greet.length);

    });

    after(function(){
        pool.end();
    })
});