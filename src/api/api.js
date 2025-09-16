// src/api/api.js
import axios from "axios";

// Backend Base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api", // 🔗 change when hosted
});

// =====================
// 🔑 AUTH
// =====================
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// =====================
// 👨‍🎓 STUDENTS
// =====================
export const createStudent = (data, token) =>
  API.post("/students", data, { headers: { Authorization: `Bearer ${token}` } });

export const getStudents = (token) =>
  API.get("/students", { headers: { Authorization: `Bearer ${token}` } });

// =====================
// 👨‍💼 EMPLOYEES
// =====================
export const createEmployee = (data, token) =>
  API.post("/employees", data, { headers: { Authorization: `Bearer ${token}` } });

export const getEmployees = (token) =>
  API.get("/employees", { headers: { Authorization: `Bearer ${token}` } });

// =====================
// 👨‍🏫 LECTURERS
// =====================
export const createLecturer = (data, token) =>
  API.post("/lecturers", data, { headers: { Authorization: `Bearer ${token}` } });

export const getLecturers = (token) =>
  API.get("/lecturers", { headers: { Authorization: `Bearer ${token}` } });
