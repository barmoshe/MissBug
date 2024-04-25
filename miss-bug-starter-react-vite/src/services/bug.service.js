import Axios from "axios";

var axios = Axios.create({
  withCredentials: true,
});

import { utilService } from "./util.service.js";

const BASE_URL = "http://localhost:3030/api/bug/";

export const bugService = {
  query,
  getById,
  save,
  remove,
};

async function query(filterBy = {}) {
  let { data: bugs } = await axios.get(BASE_URL);
  if (filterBy) {
    bugs = _filters(bugs, filterBy);
  }
  return bugs;
}

async function getById(bugId) {
  const { data: bug } = await axios.get(BASE_URL + bugId);
  return bug;
}

async function save(bug) {
  if (bug._id) {
    const { data: savedBug } = await axios.put(BASE_URL + bug._id, bug);
    return savedBug;
  } else {
    const { data: savedBug } = await axios.post(BASE_URL + "save", bug);
    return savedBug;
  }
}

async function remove(bugId) {
  return axios.get(BASE_URL + bugId + "/remove");
}

function _filters(bugs, filterBy) {
  const { txt, severity } = filterBy;
  if (txt) {
    const regExp = new RegExp(txt, "i");
    bugs = bugs.filter((bug) => regExp.test(bug.title));
  }
  if (severity) {
    bugs = bugs.filter((bug) => bug.severity === severity);
  }
  return bugs;
}

// // Route to save a bug
// app.post("/api/bug/save", async (req, res) => {
//     try {
//       const bug = req.body; // Assuming bug data is sent in the request body
//       const savedBug = await bugService.post(bug);
//       res.send(savedBug);
//     } catch (error) {
//       console.error("Error saving bug:", error);
//       res.status(500).send("Error saving bug");
//     }
//   });
