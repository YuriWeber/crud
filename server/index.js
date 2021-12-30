const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")
const bcrypt = require('bcrypt')
const tools = require("./tools.js");
const { application } = require("express");

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
                    
                    const SQL = "INSERT INTO users (name, password, access) VALUES (?, ?, ?)"
                    
                    db.query(SQL, [name, password, "user"], (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.send("success")
                        }
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
    
                const connect = await bcrypt.compare(password, dbData.password)

                if (connect) {
                    console.log("Conta valida")
                }
                else {
                    res.send("invalidAccount")
                }
            } else {
                res.send("invalidAccount")
            }
        })
    } else {
        res.send(validateLogin.error)
    }
})

app.get("/manage", (req, res) => {
    const SQL = "SELECT iduser, name, dt_created, access FROM users"
    db.query(SQL, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params
    const SQL = "DELETE FROM users WHERE iduser = ?"

    db.query(SQL, [id], (err, result) => {
        if (err) console.log(err);
        else res.send(result)
    })
})

app.put("/update", (req, res) => {
    const { id } = req.body

    const { name } = req.body.updatedValues
    const { access } = req.body.updatedValues

    const SQL =  "UPDATE users SET name = ?, access = ? WHERE iduser = ?"

    db.query(SQL, [name, access, id], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
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