const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")
const bcrypt = require('bcrypt')
const tools = require("./tools.js")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "data",
});

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
    const data = req.body.valuesRegister
    const validateRegister = tools.CheckDataRegister(data)
    if (validateRegister.validate) {
        const { name } = data
        const password = await bcrypt.hash(data.password, 10)

        const SQL = "INSERT INTO users (name, password, role) VALUES (?, ?, ?)"

        db.query(SQL, [name, password, "user"], (err, result) => {
            console.log(err)
        })
    } else {
        res.send(validateRegister.error)
    }
})

app.listen(3001, () => {
    console.log("3001");
})