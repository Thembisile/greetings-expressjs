module.exports = function (pool) {

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

    async function overallCount () {
        let outcome = await pool.query('SELECT count(*) FROM users;');
        return parseInt(outcome.rows[0].count);
    }

    async function insertData(id_name) {
        await pool.query('INSERT INTO users (id_name, count) values ($1, $2)', [id_name, 1]);
    }
    async function readUser(user) {
        let outcome = await pool.query('SELECT * FROM users WHERE id_name=$1', [user]);
        return outcome.rows;
    }
    async function updateData(Name, initialCount, Language) {
        await pool.query('UPDATE users SET count=$1, Language=$3, WHERE id_name=$2', [initialCount, Language, Name])
    }

    async function readUserData() {
        let outcome = await pool.query('SELECT * FROM users;');
        return outcome.rows;
    }

    async function reset() {
        await pool.query('DELETE FROM users;')
    }

    return {
        greetingFunction,
        reset,
        readUserData,
        readUser,
        updateData,
        overallCount
    }
}