// import axios from "axios";
import api from "./api";

// =========================
// GET
// =========================

export function getTasks() {
  return api.get("/tasks");
}


// =========================
// CREATE
// =========================

export function createTask(taskData) {
  return api.post("/tasks", taskData);
}

// =========================
// UPDATE
// =========================

export function updateTask(id, taskData) {
  return api.put(`/tasks/${id}`, taskData);
}


// =========================
// DELETE
// =========================

export function deleteTask(id) {
  return api.delete(`/tasks/${id}`);
}