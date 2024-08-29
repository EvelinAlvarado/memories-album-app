import { v4 as uuidv4 } from "uuid";
import { api } from "./api";
import { User } from "../types/User";

// Function to fetch user data from the server using async/await
const fetchUser = async (): Promise<User[]> => {
  try {
    const response = await api.get("/user");
    console.log(response.status, response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching user: ", error);
    throw new Error("Failed to fetch user");
  }
};

//Function to create a new User
const createUser = async (userName: string): Promise<User> => {
  const id = uuidv4();
  try {
    const response = await api.post("/user", {
      id,
      userName,
    });
    console.log(response.status, response.data);
    return response.data;
  } catch (error) {
    console.log("Error creating user", error);
    throw new Error("Failed to create a User");
  }
};

//Function to update User
const updateUser = async (user: User): Promise<User> => {
  try {
    const response = await api.put(`/user/${user.id}`, user);
    console.log(response.status, response.data);
    return response.data;
  } catch (error) {
    console.log("Error updating user");
    throw new Error("Failed to update User.");
  }
};

//Function to delete a User
const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    console.log("Delete user: ", userId);
    const response = await api(`/user/${userId}`);
    const isDeleted = response.status === 200;
    if (isDeleted) {
      console.log("User deleting successfully");
    }
    return isDeleted;
  } catch (error) {
    console.log("Error deleting user: ", error);
    throw new Error("Failed to delete a User.");
  }
};

export const userClientServices = {
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
};
