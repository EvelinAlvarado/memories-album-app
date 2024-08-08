import axios from "axios";

// Create a instance because is recommendable.
export const api = axios.create({
  baseURL: "http://localhost:3000",
});
