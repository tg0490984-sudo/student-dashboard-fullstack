const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

/* -------------------- MIDDLEWARE -------------------- */
app.use(
  cors({
    origin: "*", // allow requests from anywhere (Vercel frontend)
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

/* -------------------- DATA (TEMP STORAGE) -------------------- */
let subjects = [
  "Mathematics",
  "Data Structures & Algorithms",
  "Python Programming",
  "Database Management Systems",
  "Artificial Intelligence & Machine Learning",
];

let assignments = [
  { title: "DSA Homework", completed: false },
  { title: "Python Mini Project", completed: false },
  { title: "DBMS Assignment", completed: true },
];

let attendance = {
  present: true,
};

/* -------------------- ROUTES -------------------- */

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* ---------- SUBJECTS ---------- */
app.get("/api/subjects", (req, res) => {
  res.json(subjects);
});

app.post("/api/subjects", (req, res) => {
  const { subject } = req.body;

  if (!subject) {
    return res.status(400).json({ message: "Subject is required" });
  }

  subjects.push(subject);
  res.status(201).json(subjects);
});

app.delete("/api/subjects/:index", (req, res) => {
  const index = Number(req.params.index);

  if (isNaN(index) || index < 0 || index >= subjects.length) {
    return res.status(400).json({ message: "Invalid subject index" });
  }

  subjects.splice(index, 1);
  res.json(subjects);
});

/* ---------- ASSIGNMENTS ---------- */
app.get("/api/assignments", (req, res) => {
  res.json(assignments);
});

app.post("/api/assignments", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Assignment title is required" });
  }

  assignments.push({ title, completed: false });
  res.status(201).json(assignments);
});

app.put("/api/assignments/:index", (req, res) => {
  const index = Number(req.params.index);

  if (isNaN(index) || index < 0 || index >= assignments.length) {
    return res.status(400).json({ message: "Invalid assignment index" });
  }

  assignments[index].completed = !assignments[index].completed;
  res.json(assignments);
});

app.delete("/api/assignments/:index", (req, res) => {
  const index = Number(req.params.index);

  if (isNaN(index) || index < 0 || index >= assignments.length) {
    return res.status(400).json({ message: "Invalid assignment index" });
  }

  assignments.splice(index, 1);
  res.json(assignments);
});

/* ---------- ATTENDANCE ---------- */
app.get("/api/attendance", (req, res) => {
  res.json(attendance);
});

app.put("/api/attendance", (req, res) => {
  attendance.present = !attendance.present;
  res.json(attendance);
});

/* -------------------- START SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
