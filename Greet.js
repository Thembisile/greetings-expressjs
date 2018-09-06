module.exports = function (storedUser) {
  let pg = require("pg");
  let Pool = pg.Pool;
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
  let person = '';
  let nameAndLang = '';
  let mapNames = {};

  async function greetingFunction(name, language) {


    if (name != '') {
      person = name
    }
    if (person !== "") {

      if (mapNames[person] === undefined) {

        mapNames[person] = 0;
      }
    }

    if (language === 'English') {
      nameAndLang = 'Hello, ' + name;
    }
    if (language === 'Afrikaans') {
      nameAndLang = 'Goeie Dag, ' + name;
    }
    if (language === 'IsiXhosa') {
      nameAndLang = 'Molo, ' + name;
    }
    else {

      let user = await pool.query('SELECT * FROM users WHERE id_name=$1', [name])
      if (user.rows.length != 0) {
        let currentCount = await pool.query('SELECT count FROM users WHERE id_name = $1', [name]);
        let initialCount = currentCount.rows[0].count + 1;
        await pool.query('UPDATE users SET count=$1 WHERE id_name=$2', [initialCount, name]);
      }
      else {
        await pool.query('INSERT INTO users (id_name, count) values ($1, $2)', [name, 1])
      }
    }
    return nameAndLang;
  }


  function returnGreeting() {
    return nameAndLang
  }

  function greetCounter() {
    return Object.entries(mapNames).length;
  }

  function nameMap() {
    return mapNames
  }

  function reset() {
    person = '';
    nameAndLang = '';
    mapNames = {};

  }

  return {
    greetingFunction,
    returnGreeting,
    greetCounter,
    nameMap,
    reset
  }
}
