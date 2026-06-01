const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   DATABASE CONNECTION
========================= */

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rugoma_global_technologies_ltd"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection error:", err);
    } else {
        console.log("Database Connected");
    }
});

/* =========================
   REGISTER USER
========================= */

app.post("/api/register", async (req, res) => {

    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username=?",
        [username],
        async (err, result) => {

            if (err) return res.status(500).json(err);

            if (result.length > 0) {
                return res.status(400).json({
                    message: "User already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                "INSERT INTO users(username,password) VALUES(?,?)",
                [username, hashedPassword],
                (err) => {

                    if (err) return res.status(500).json(err);

                    res.json({
                        message: "User registered successfully"
                    });
                }
            );
        }
    );
});

/* =========================
   LOGIN USER
========================= */

app.post("/api/login", (req, res) => {

    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username=?",
        [username],
        async (err, result) => {

            if (err) return res.status(500).json(err);

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const isMatch = await bcrypt.compare(
                password,
                result[0].password
            );

            if (!isMatch) {
                return res.status(401).json({
                    message: "Wrong password"
                });
            }

            const token = jwt.sign(
                { userid: result[0].userid },
                "rugoma_secret",
                { expiresIn: "1d" }
            );

            res.json({
                message: "Login successful",
                token
            });
        }
    );
});

/* =========================
   EMPLOYEES CRUD
========================= */

/* GET ALL */
app.get("/api/employees", (req, res) => {

    db.query("SELECT * FROM employees", (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);
    });
});

/* GET ONE */
app.get("/api/employees/:id", (req, res) => {

    db.query(
        "SELECT * FROM employees WHERE emp_id=?",
        [req.params.id],
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);
        }
    );
});

/* ADD */
app.post("/api/employees", (req, res) => {

    const { emp_name, responsibility } = req.body;

    db.query(
        "INSERT INTO employees(emp_name,responsibility) VALUES(?,?)",
        [emp_name, responsibility],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({ message: "Employee added" });
        }
    );
});

/* UPDATE */
app.put("/api/employees/:id", (req, res) => {

    const { emp_name, responsibility } = req.body;

    db.query(
        "UPDATE employees SET emp_name=?, responsibility=? WHERE emp_id=?",
        [emp_name, responsibility, req.params.id],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({ message: "Employee updated" });
        }
    );
});

/* DELETE */
app.delete("/api/employees/:id", (req, res) => {

    db.query(
        "DELETE FROM employees WHERE emp_id=?",
        [req.params.id],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({ message: "Employee deleted" });
        }
    );
});

/* =========================
   SALARIES
========================= */

/* GET ALL */
app.get("/api/salaries", (req, res) => {

    const sql = `
        SELECT salaries.salary_id,
               employees.emp_name,
               salaries.paydate,
               salaries.amount
        FROM salaries
        JOIN employees
        ON salaries.emp_id = employees.emp_id
    `;

    db.query(sql, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);
    });
});

/* ADD */
app.post("/api/salaries", (req, res) => {

    const { emp_id, paydate, amount } = req.body;

    db.query(
        "INSERT INTO salaries(emp_id,paydate,amount) VALUES(?,?,?)",
        [emp_id, paydate, amount],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({ message: "Salary added" });
        }
    );
});

/* DELETE */
app.delete("/api/salaries/:id", (req, res) => {

    db.query(
        "DELETE FROM salaries WHERE salary_id=?",
        [req.params.id],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({ message: "Salary deleted" });
        }
    );
});

/* UPDATE */
app.put("/api/salaries/:id", (req, res) => {

    const { emp_id, paydate, amount } = req.body;

    db.query(
        "UPDATE salaries SET emp_id=?, paydate=?, amount=? WHERE salary_id=?",
        [emp_id, paydate, amount, req.params.id],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({ message: "Salary updated" });
        }
    );
});

/* =========================
    REPORTS
========================= */

app.get("/api/reports", (req, res) => {

    const sql = `
        SELECT 
            e.emp_id,
            e.emp_name,
            e.responsibility,
            s.salary_id,
            s.paydate,
            s.amount
        FROM employees e
        LEFT JOIN salaries s ON e.emp_id = s.emp_id
        ORDER BY e.emp_name, s.paydate DESC
    `;

    db.query(sql, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);
    });
});

/* =========================
    START SERVER
========================= */

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});