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

app.post("/register", (req, res) => {
    const data = req.body.valuesRegister
    const validateRegister = tools.CheckDataRegister(data)
    if (validateRegister.validate) {
        const { name } = data
        UsedName(name, async function(err, result) {
            if (err) {
                console.log(err)
            }
            else {
                const used = result
                if (used) {
                    res.send('usedName')
                }
                else {            
                    const password = await bcrypt.hash(data.password, 10)
                    
                    const SQL = "INSERT INTO users (name, password, role) VALUES (?, ?, ?)"
                    
                    db.query(SQL, [name, password, "user"], (err, result) => {
                        console.log(err)
                    })
                }
            }
        })
    } else {
        res.send(validateRegister.error)
    }
})

app.post("/login", (req, res) => {
    const data = req.body.valuesLogin
    const validateLogin = tools.CheckDataLogin(data)
    if (validateLogin.validate) {
        const { name } = data
        const { password } = data

        const SQL = "SELECT * FROM users WHERE name = ?"

        db.query(SQL, [name], async (err, result) => {
           if (result.length >= 1) {
                const dbData = result[0]
    
                console.log(await bcrypt.compare(password, dbData.password))
            } else {
                res.send()
            }
        })
    } else {
        res.send(validateLogin.error)
    }
})

app.listen(3001, () => {
    console.log("3001");
})

const UsedName = (name, callback) => {
    const SQL = "SELECT * FROM users WHERE name = ?"
    db.query(SQL, [name], (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result.length >= 1)
        }
    })
}