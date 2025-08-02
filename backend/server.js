const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "signup"
})

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL: ", err);
        process.exit();
    }
    console.log("Connected to MySQL database.");
});

app.get("/", (req, res) => {
    res.send("Backend is working!");
});


/* app.post('/signup',(req,res) =>{
    const sql = "INSERT INTO LOGIN (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values], (err, data) =>{
        if(err)
        {
            return res.json("Error");
        }
        return res.json(data);
    })
}) */

    app.post('/signup', (req, res) => {
        const sql = "INSERT INTO LOGIN (`name`, `email`, `password`) VALUES (?, ?, ?)";
        const values = [req.body.name, req.body.email, req.body.password];
    
        db.query(sql, values, (err, data) => {
            if (err) {
                console.error("SQL Error:", err);
                return res.status(500).json({ error: "Database Error" });
            }
            return res.status(201).json({ message: "User registered successfully", data });
        });
    });
    

app.listen(8081, () =>{
    console.log('listening');
})