import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// ===============================
// 📌 GET all projects (PUBLIC)
// ===============================
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===============================
// 👤 GET all projects (GUEST – READ ONLY)
// ===============================
router.get("/guest", async (req, res) => {
  try {
    const projects = await Project.find().select(
      "name description createdAt"
    );
    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ===============================
// 📌 CREATE project (PUBLIC)
// ===============================
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name required",
      });
    }

    const project = await Project.create({
      name,
      description: description || "",
    });

    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===============================
// 📌 GET single project (PUBLIC)
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===============================
// 📌 UPDATE project (PUBLIC)
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===============================
// 📌 DELETE project (PUBLIC)
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({ success: true, message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
