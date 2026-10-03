import axios from "axios";

export function getTasks() {
  return axios.get("/api/tasks");
}


export function createTask(taskData) {
  return axios.post("/api/tasks", taskData);
}