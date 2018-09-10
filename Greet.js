module.exports = function (storedUser) {

  async function greetingFunction(name, language) {

    let user = await readUser(name)
    if (user.length != 0) {

      let initialCount = user.count + 1;

      await updateData(name, initialCount, language);
      }
    else {
      await insertData(name, language)
    }

    return language + ', ' + name;
  }

  function insertData(id_name){
    await pool.query('INSERT INTO users (id_name, count) values ($1, $2)', [id_name, 1])
  }
  function readUser(id_name) {
    let outcome = await pool.query('SELECT * FROM users WHERE id_name=$1', [id_name]);
    return outcome.rows;
  }
  function updateData(Name, initialCount, Language) {
    await pool.query('UPDATE users SET count=$1, Language=$3, WHERE id_name=$2', [initialCount, Language, Name])
  }

  function readUserData() {
    let outcome = await pool.query('SELECT * FROM users;');
    return outcome.rows;
  }

  function reset() {
    await pool.query('DELETE FROM users;')
  }

  return {
    greetingFunction,
    reset,
    readUserData,
    readUser,
    updateData
  }
}
