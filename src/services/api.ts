import axios from "axios";

// Create a instance because is recommendable.
export const api = axios.create({
  // If you're running this project locally, uncomment the following line:
  //baseURL: "http://localhost:3000",

  // If you're using the online version, leave this as is:
  baseURL: "https://json-server-memories-album-app.vercel.app/",
});
