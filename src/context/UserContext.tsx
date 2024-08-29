import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/User";
import { userClientServices } from "../services/UserService";

export interface UserProps {
  user: User[];
  currentUser: User | null; // New state to store the current user
  /* setCurrentUser: (user: User | null) => void; */
  fetchUser: () => Promise<void>;
  createUser: (userName: string) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

/**
 * `UserContext` is initialized with `undefined` to handle cases where the context
 * might not be available or provided by a parent component. This ensures that if a
 * component tries to access the context without a provider, TypeScript will enforce
 * checking for `undefined`, prompting you to handle the case where the context is not available.
 *
 * This approach helps prevent runtime errors and ensures that components safely use
 * the context only when it’s properly provided.
 */
export const UserContext = createContext<UserProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode; // `children` can be any renderable content in React (e.g., elements, strings, components)
}

// `children` represents the nested content/components that this provider will wrap around
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  //  Fetch User from the server and update the local state.
  //  This effect runs once when the component mounts.
  const fetchUser = async () => {
    try {
      const data = await userClientServices.fetchUser();
      console.log("Fetching user in context: ", data);
      setUser(data);
    } catch (error) {
      console.log("Failed to fetch user in context: ", error);
    }
  };

  // Create a new user, update the user list and set currentUser
  const createUser = async (userName: string) => {
    try {
      const newUser = await userClientServices.createUser(userName);
      console.log("Create a new User in context: ", newUser);
      setUser((prevUser) => [...prevUser, newUser]);
      setCurrentUser(newUser); // Set currentUser after creation
      /* return newUser; */
    } catch (error) {
      console.log("Error to create a User in context: ", error);
    }
  };

  // Update an existing user, update the user list and set currentUser if necessary
  const updateUser = async (user: User) => {
    try {
      const updatedUser = await userClientServices.updateUser(user);
      setUser((prevUser) =>
        prevUser.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      setCurrentUser(updatedUser);
      console.log("User after updated function: ", user);
    } catch (error) {
      console.log("Failed to update User in context");
    }
  };

  // Delete a user, update the user list and possibly clear currentUser if it was deleted
  const deleteUser = async (userId: string) => {
    try {
      await userClientServices.deleteUser(userId);
      setUser((prevUser) => prevUser.filter((user) => user.id !== userId));
      if (currentUser?.id === userId) {
        setCurrentUser(null); // Clear currentUser if it was deleted
      }
      console.log("User after delete in context: ", user);
    } catch (error) {
      console.log("Failed to delete user in context");
    }
  };

  console.log("currentUser in context: ", currentUser);
  // useEffect hook to fetch categories when the component mounts.
  // The empty dependency array `[]` ensures this effect runs only once.
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        currentUser,
        /* setCurrentUser, */
        fetchUser,
        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
