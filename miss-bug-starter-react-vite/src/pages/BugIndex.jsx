import React, { useState, useEffect, useRef } from "react";
import { bugService } from "../services/bug.service.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { BugList } from "../cmps/BugList.jsx";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function BugIndex() {
  const [bugs, setBugs] = useState([]);
  const [filterBy, setFilterBy] = useState({});
  const componentRef = useRef();

  useEffect(() => {
    loadBugs();
  }, []);

  useEffect(() => {
    loadBugs();
  }, [filterBy]);

  async function loadBugs() {
    const bugs = await bugService.query(filterBy);
    setBugs(bugs);
  }

  async function onRemoveBug(bugId) {
    try {
      await bugService.remove(bugId);
      setBugs((prevBugs) => prevBugs.filter((bug) => bug._id !== bugId));
      showSuccessMsg("Bug removed");
    } catch (err) {
      console.log("Error from onRemoveBug ->", err);
      showErrorMsg("Cannot remove bug");
    }
  }

  async function onAddBug() {
    const bug = {
      title: prompt("Bug title?"),
      severity: +prompt("Bug severity?"),
    };
    try {
      const savedBug = await bugService.save(bug);
      setBugs((prevBugs) => [...prevBugs, savedBug]);
      showSuccessMsg("Bug added");
    } catch (err) {
      console.log("Error from onAddBug ->", err);
      showErrorMsg("Cannot add bug");
    }
  }

  async function onEditBug(bug) {
    const severity = +prompt("New severity?");
    const bugToSave = { ...bug, severity };
    try {
      const savedBug = await bugService.save(bugToSave);
      setBugs((prevBugs) =>
        prevBugs.map((currBug) =>
          currBug._id === savedBug._id ? savedBug : currBug
        )
      );
      showSuccessMsg("Bug updated");
    } catch (err) {
      console.log("Error from onEditBug ->", err);
      showErrorMsg("Cannot update bug");
    }
  }

  const handleDownloadPDF = async () => {
    console.log("Ref:", componentRef.current);
    try {
      const canvas = await html2canvas(componentRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save("bug_list.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <main className="bug-index">
      <h3>Bugs App</h3>
      <main>
        <button className="add-btn" onClick={onAddBug}>
          Add Bug
        </button>
        <input
          type="text"
          placeholder="Search bug"
          onChange={(ev) => setFilterBy({ ...filterBy, txt: ev.target.value })}
        />
        <input
          type="number"
          placeholder="Filter by severity"
          onChange={(ev) =>
            setFilterBy({ ...filterBy, severity: +ev.target.value })
          }
        />
        <button onClick={handleDownloadPDF}>Download Bug List as PDF</button>
        <BugList
          ref={componentRef}
          id="bug-list"
          bugs={bugs}
          onRemoveBug={onRemoveBug}
          onEditBug={onEditBug}
        />
      </main>
    </main>
  );
}
