const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//  DATABASE CONNECTION NIYA
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "library_db"
});

db.connect(err => {
    if (err) {
        console.log("DB ERROR:", err);
    } else {
        console.log("MySQL Connected");
    }
});

// PARA REGISTER 
app.post("/register", (req, res) => {

    const { firstname, middlename, lastname, username, password } = req.body;

    const sql = `
        INSERT INTO users 
        (firstname, middlename, lastname, username, password, role)
        VALUES (?,?,?,?,?,?)
    `;

    db.query(sql,
        [firstname, middlename, lastname, username, password, "student"],
        (err) => {

            if (err) {
                console.log("REGISTER ERROR:", err);
                return res.json({ success: false });
            }

            res.json({ success: true });
        }
    );
});