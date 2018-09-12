module.exports = function (pool) {

    async function GreetingFunction(name, language) {

        let user = await ReadUser(name)
        if (user.length != 0) {

            let initialCount = user.count + 1;

            await UpdateData(name, initialCount);
        }
        else {
            await InsertData(name)
        }

        return language + ', ' + name;
    }

    async function OverallCount () {
        let outcome = await pool.query('SELECT count(*) FROM users;');
        return parseInt(outcome.rows[0].count);
    }

    async function InsertData(id_name) {
        await pool.query('INSERT INTO users (id_name, count) values ($1, $2)', [id_name, 1]);
    }
    async function ReadUser(person) {
        let outcome = await pool.query('SELECT * FROM users where id_name=$1', [person]);
        return outcome.rows;
    }
    async function UpdateData(Name, initialCount) {
        await pool.query('UPDATE users SET count=$1 WHERE id_name=$2', [initialCount, Name])
    }

    async function ReadUserData() {
        let outcome = await pool.query('SELECT * FROM users;');
        return outcome.rows;
    }

    async function Reset() {
        await pool.query('DELETE FROM users;')
    }

    return {
        GreetingFunction,
        Reset,
        ReadUserData,
        ReadUser,
        UpdateData,
        OverallCount
    }
}
