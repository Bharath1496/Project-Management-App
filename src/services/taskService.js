import axios from "axios";


// =========================
// GET
// =========================

export function getTasks() {
  return axios.get("/api/tasks");
}


// =========================
// CREATE
// =========================

export function createTask(taskData) {
  return axios.post("/api/tasks", taskData);
}


// =========================
// UPDATE
// =========================

export function updateTask(id, taskData) {
  return axios.put(`/api/tasks/${id}`, taskData);
}


// =========================
// DELETE
// =========================

export function deleteTask(id) {
  return axios.delete(`/api/tasks/${id}`);
}