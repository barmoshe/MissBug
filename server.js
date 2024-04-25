import express from "express";

import { bugService } from "./services/bugService.service.js";

const app = express();

// Route to retrieve all bugs
app.get("/api/bug", async (req, res) => {
  try {
    const bugs = await bugService.query();
    res.send(bugs);
  } catch (error) {
    console.error("Error retrieving bugs:", error);
    res.status(500).send("Error retrieving bugs");
  }
});

// Route to save a bug
app.post("/api/bug/save", async (req, res) => {
  try {
    const bug = req.body; // Assuming bug data is sent in the request body
    const savedBug = await bugService.post(bug);
    res.send(savedBug);
  } catch (error) {
    console.error("Error saving bug:", error);
    res.status(500).send("Error saving bug");
  }
});

// Route to retrieve a bug by its ID
app.get("/api/bug/:bugId", async (req, res) => {
  try {
    const bugId = req.params.bugId;
    const bug = await bugService.getById(bugId);
    if (!bug) {
      return res.status(404).send("Bug not found");
    }
    res.send(bug);
  } catch (error) {
    console.error("Error retrieving bug:", error);
    res.status(500).send("Error retrieving bug");
  }
});

// Route to remove a bug by its ID
app.get("/api/bug/:bugId/remove", async (req, res) => {
  try {
    const bugId = req.params.bugId;
    await bugService.remove(bugId);
    res.send("Bug removed successfully");
  } catch (error) {
    console.error("Error removing bug:", error);
    res.status(500).send("Error removing bug");
  }
});

const port = 3030;
app.listen(port, () => {
  console.log(`Server listening on port http://127.0.0.1:${port}/`);
});
