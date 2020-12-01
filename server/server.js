const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.port || 3000;

var connection = mysql.createConnection({
    host : 'sql9.freemysqlhosting.net',
    user : 'sql9377168',
    password : '14U2xK8UTe',
    database: 'sql9377168'
});

app.post('/signup', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
    connection.query(`INSERT INTO user VALUES ("", "${username}", "${password}")`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    connection.query(`SELECT id FROM user WHERE user.username = "${username}" && user.password = "${password}"`,
     function (error, users, fields) {
        if (error) throw error;
        if (users[0].id > 0) {
            //let token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '7d' });
            res.json({
                success: true,
                userId: users[0].id,
                err: null
                //token
            });
        }
        else {
            res.status(401).json({
                success: false,
                token: null,
                err: 'Username or password is incorrect'
            });
        }
    });
});

app.post('/budget', async (req, res) => {
    console.log(req.body);
    const { userId } = req.body;
    connection.query(`SELECT * FROM personalBudget WHERE personalBudget.userId = ${userId}`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});