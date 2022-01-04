const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const tools = require("./tools.js");
const jwt = require("jsonwebtoken")

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "data",
});

const key = "WtZWvwoeEMHrHI098zjyfCsToH";

app.use(cors());
app.use(express.json());

const VerifyJWT = (req, res, next) => {
  const {authorization} = req.headers
  jwt.verify(authorization, key, (err, decoded) => {
    if (err) {
      req.auth = false
      next()
    } else { 
      req.auth = true
      req.iduser = decoded.iduser
      req.name = decoded.name
      next()
    }
  })
}

app.post("/register", (req, res) => {
  const data = req.body.valuesRegister;
  const validateRegister = tools.CheckDataRegister(data);
  if (validateRegister.validate) {
    const { name } = data;
    UsedName(name, async function (err, result) {
      if (err) {
        console.log(err);
      } else {
        const used = result;
        if (used) {
          res.send({ message: "usedName" });
        } else {
          const password = await bcrypt.hash(data.password, 10);

          const SQL =
            "INSERT INTO users (name, password, access) VALUES (?, ?, ?)";

          db.query(SQL, [name, password, "user"], (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send({ message: "success" });
            }
          });
        }
      }
    });
  } else {
    res.send({ message: validateRegister.error });
  }
});

app.post("/login", (req, res) => {
  const data = req.body.valuesLogin;
  const validateLogin = tools.CheckDataLogin(data);
  if (validateLogin.validate) {
    const { name } = data;
    const { password } = data;

    const SQL = "SELECT * FROM users WHERE name = ?";

    db.query(SQL, [name], async (err, result) => {
      if (result.length >= 1) {
        const dbData = result[0];

        const valid = await bcrypt.compare(password, dbData.password);

        if (valid) {
          const token = jwt.sign({
              iduser:dbData.iduser, name:dbData.name}, key, { expiresIn: "30d" })

          res.send({
            token: token,
            auth: true,
          });
        } else {
          res.send({ message: "invalidAccount", auth: false });
        }
      } else {
        res.send({ message: "invalidAccount", auth: false });
      }
    });
  } else {
    res.send({ message: validateLogin.error, auth: false });
  }
});

app.get("/manage", (req, res) => {
  const SQL = "SELECT iduser, name, dt_created, access FROM users";
  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const SQL = "DELETE FROM users WHERE iduser = ?";

  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    else { 
      CreateAdmin()
      res.send(result)
    }
  });
});

app.put("/update", (req, res) => {
  const { id } = req.body;

  const { name } = req.body.updatedValues;
  const { access } = req.body.updatedValues;

  const SQL = "UPDATE users SET name = ?, access = ? WHERE iduser = ?";

  db.query(SQL, [name, access, id], (err, result) => {
    if (err) console.log(err);
    else {
      CreateAdmin()
      res.send(result)
    }
  });
});

app.post("/authorization", VerifyJWT, (req, res) =>{
  res.send({auth: req.auth, user: {name: req.name, iduser: req.iduser}})
})

app.post("/access", VerifyJWT, (req, res) => {
  const SQL = "SELECT * FROM users WHERE iduser = ?"

  db.query(SQL, [req.iduser], (err, result) => {
    const userData = result[0]
    if (userData.access === "admin") {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

app.put("/update-user", async (req, res) => {
  const data = req.body
  let SQL = ""

  
  if (data.password && data.password !== "") {
    const validateUpdate = tools.CheckDataRegister(data)
    if (validateUpdate.validate) {
      const password = await bcrypt.hash(data.password, 10)
      SQL = `UPDATE users SET name = '${data.name}', password = '${password}', access = '${data.access}' WHERE iduser = ${data.iduser}`
    } else return res.send({message: validateUpdate.error});


  } else {
    if (!data.name || data.name.length < 4) return res.send({message: "shortName"})
    else SQL = `UPDATE users SET name = '${data.name}', access = '${data.access}' WHERE iduser = ${data.iduser}`;
  }

  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err)
      return res.send({message: "updateFailed"})
    } else {
      CreateAdmin()
      const token = jwt.sign({iduser: data.iduser, name: data.name}, key, {expiresIn: "30d"})
      return res.send({message: "success", token: token})
    }
  })
})

app.listen(3001, () => {
  console.log("3001");
  CreateAdmin()
});

const CreateAdmin = () => {
  const SQLSELECT = "SELECT * FROM users WHERE access = 'admin'"
  
  db.query(SQLSELECT, async (err, result) => {
    if (err) return console.log("Select Error - CreateAdmin");
    
    if (result.length < 1) {
      const name = "admin"
      const password = await bcrypt.hash("admin", 10)
      const SQLINSERT = "INSERT INTO users (name, password, access) VALUES (?, ?, 'admin')"

      db.query(SQLINSERT, [name, password], (err, result) => {
        if (err) return console.log("Insert Error - CreateAdmin" + err)
      })
    }
  })
}

const UsedName = (name, callback) => {
  const SQL = "SELECT * FROM users WHERE name = ?";
  db.query(SQL, [name], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.length >= 1);
    }
  });
};