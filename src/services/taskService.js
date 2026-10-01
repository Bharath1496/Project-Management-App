import axios from "axios";

export function getTasks() {
  return axios.get("/api/tasks");
}