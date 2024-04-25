import fs from "fs";
import { utilService } from "./util.service.js";
let bugs = [];
bugs = utilService.readJsonFile("data/bug.json");

export const bugService = {
  query,
  getById,
  remove,
  save,
};

async function query() {
  try {
    return bugs;
  } catch (error) {
    throw error;
  }
}
async function getById(bugId) {
  try {
    const bug = bugs.find((bug) => bug._id === bugId);
    return bug;
  } catch (error) {
    throw error;
  }
}
async function remove(bugId) {
  try {
    const bugIdx = bugs.findIndex((bug) => bug._id === bugId);
    bugs.splice(bugIdx, 1);
    _saveBugsToFile();
  } catch (error) {
    throw error;
  }
}
async function save(bugToSave) {
  try {
    if (bugToSave._id) {
      const idx = bugs.findIndex((bug) => bug._id === bugToSave._id);
      if (idx < 0) throw `Cant find bug with _id ${bugToSave._id}`;
      bugs[idx] = bugToSave;
    } else {
      bugToSave._id = utilService.makeId();
      bugs.push(bugToSave);
    }
    await _saveBugsToFile();
    return bugToSave;
  } catch (error) {
    throw error;
  }
}
function _saveBugsToFile(path = "./data/bug.json") {
  fs.writeFileSync(path, JSON.stringify(bugs, null, 2));
}
