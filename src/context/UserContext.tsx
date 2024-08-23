import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/User";
import { userClientServices } from "../services/UserService";

export interface UserProps {
  user: User[];
  fetchUser: () => Promise<void>;
  createUser: (name: string) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
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

  //Create a new User and update the local state
  const createUser = async (name: string) => {
    try {
      const newUser = await userClientServices.createUser(name);
      console.log("Create a new User in context: ", newUser);
      setUser((prevUser) => [...prevUser, newUser]);
    } catch (error) {
      console.log("Error to create a User in context: ", error);
    }
  };

  // Update an existing user and update the local state.
  // Replaces the old user with the updated one in the list.
  const updateUser = async (user: User) => {
    try {
      const updateUser = await userClientServices.updateUser(user);
      setUser((prevUser) =>
        prevUser.map((user) =>
          user.userId === updateUser.userId ? updateUser : user
        )
      );
      console.log("User after updated function: ", user);
    } catch (error) {
      console.log("Failed to update User in context");
    }
  };

  // Delete a user by its ID and update the local state.
  // Removes the deleted user from the list.
  const deleteUser = async (id: string) => {
    try {
      await userClientServices.deleteUser(id);
      setUser((prevUser) => prevUser.filter((user) => user.userId !== id));
      console.log("User after delete in context: ", user);
    } catch (error) {
      console.log("Failed to delete user in context");
    }
  };

  // useEffect hook to fetch categories when the component mounts.
  // The empty dependency array `[]` ensures this effect runs only once.
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{ user, fetchUser, createUser, updateUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
