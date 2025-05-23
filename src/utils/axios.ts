import axios from "axios";

const baseURL =
  typeof window === "undefined"
    ? "http://localhost:5000" // server-side
    : "http://localhost:5000"; // client-side (you can customize per env)

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
