const express = require("express");
const cors = require("cors");

const app = express();
const subjects = [
  "Mathematics",
  "Data Structures & Algorithms",
  "Python Programming",
  "Database Management Systems",
  "Artificial Intelligence & Machine Learning",
];
const assignments = [
  { title: "DSA Homework", completed: false },
  { title: "Python Mini Project", completed: false },
  { title: "DBMS Assignment", completed: true },
];
let attendance = {
  present: true,
};

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.get("/api/subjects", (req, res) => {
  res.json(subjects);
});
app.get("/api/assignments", (req, res) => {
  res.json(assignments);
});
app.post("/api/assignments", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Assignment title is required",
    });
  }

  const newAssignment = {
    title,
    completed: false,
  };

  assignments.push(newAssignment);

  res.status(201).json({
    message: "Assignment added successfully",
    assignments,
  });
});
app.put("/api/assignments/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (isNaN(index) || index < 0 || index >= assignments.length) {
    return res.status(400).json({
      message: "Invalid assignment index",
    });
  }

  assignments[index].completed = !assignments[index].completed;

  res.json({
    message: "Assignment status updated",
    assignments,
  });
});

app.delete("/api/assignments/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (isNaN(index) || index < 0 || index >= assignments.length) {
    return res.status(400).json({
      message: "Invalid assignment index",
    });
  }

  assignments.splice(index, 1);

  res.json({
    message: "Assignment deleted successfully",
    assignments,
  });
});

app.post("/api/subjects", (req, res) => {
  const { subject } = req.body;

  if (!subject) {
    return res.status(400).json({
      message: "Subject is required",
    });
  }

  subjects.push(subject);

  res.status(201).json({
    message: "Subject added successfully",
    subjects,
  });
});
app.delete("/api/subjects/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (isNaN(index) || index < 0 || index >= subjects.length) {
    return res.status(400).json({
      message: "Invalid subject index",
    });
  }

  subjects.splice(index, 1);

  res.json({
    message: "Subject deleted successfully",
    subjects,
  });
});

app.get("/api/attendance", (req, res) => {
  res.json(attendance);
});

app.put("/api/attendance", (req, res) => {
  attendance.present = !attendance.present;

  res.json({
    message: "Attendance updated",
    attendance,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
