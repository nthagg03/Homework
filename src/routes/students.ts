import express, { Request, Response } from "express";
import db from "../db";

const router = express.Router();

/*
 * CREATE - POST /students
 */
router.post("/", (req: Request, res: Response) => {
  const { student_name, student_id, subject } = req.body;
  const sql = "INSERT INTO students(student_name, student_id, subject) VALUES (?, ?, ?)";

  db.query(sql, [student_name, student_id, subject], (err) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.status(201).json({ success: true, message: "Student created" });
  });
});

/*
 * READ ALL - GET /students
 */
router.get("/", (_req: Request, res: Response) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.status(200).json(result);
  });
});

/*
 * READ BY ID - GET /students/:id
 */
router.get("/:id", (req: Request, res: Response) => {
  db.query("SELECT * FROM students WHERE id = ?", [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.status(200).json(result);
  });
});

/*
 * UPDATE - PUT /students/:id
 */
router.put("/:id", (req: Request, res: Response) => {
  const { student_name, student_id, subject } = req.body;

const sql =
"UPDATE students SET student_name=?, student_id=?, subject=? WHERE id=?";

  db.query(sql, [student_name, student_id, subject, req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: "Student updated" });
  });
});

/*
 * DELETE - DELETE /students/:id
 */
router.delete("/:id", (req: Request, res: Response) => {
  db.query("DELETE FROM students WHERE id = ?", [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: "Student deleted" });
  });
});

export default router;