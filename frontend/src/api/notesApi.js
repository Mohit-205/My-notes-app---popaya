import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });


export const getNotes = (search = "") => API.get(`/notes?search=${encodeURIComponent(search)}`);
export const getNoteById = (id) => API.get(`/notes/${id}`);
export const createNote = (data) => API.post("/notes", data);
export const updateNote = (id, data) => API.put(`/notes/${id}`, data);
export const deleteNote = (id) => API.delete(`/notes/${id}`);