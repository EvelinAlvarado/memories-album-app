import axios from "axios";

// Create a instance because is recommendable.
export const api = axios.create({
  // If you're running this project locally, uncomment the following line:
  baseURL: "http://localhost:3000",

  // If you're using the online version, leave this as is:
<<<<<<< HEAD
  // baseURL: "https://json-server-memories-album-app.vercel.app/",
=======
  baseURL: "https://fake-api-memories-album-app.vercel.app/",
>>>>>>> 744a969542eee7286b814d9a99e399057310ed8a
});
