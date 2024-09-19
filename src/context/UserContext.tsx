import { createContext, ReactNode, useEffect, useState } from "react";
import { User, UserWithId } from "../types/User";
import { userClientServices } from "../services/UserService";

export interface UserProps {
  user: UserWithId[]; // User array from Firestore
  currentUser: UserWithId | null; // Track the current selected user
  /* setCurrentUser: (user: User | null) => void; */
  fetchUser: () => Promise<UserWithId[]>;
  createUser: (user: User) => Promise<UserWithId>;
  updateUser: (userId: string, updateData: Partial<User>) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

/**
 ** `UserContext` is initialized with `undefined` to handle cases where the context
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
  const [user, setUser] = useState<UserWithId[]>([]); // State to hold the user list
  const [currentUser, setCurrentUser] = useState<UserWithId | null>(null);

  //  Fetch User from the server and update the local state.
  //  This effect runs once when the component mounts.
  const fetchUser = async (): Promise<UserWithId[]> => {
    try {
      const data = await userClientServices.fetchUser(); // Fetch users from Firestore
      console.log("Fetching user in context: ", data);
      setUser(data);
      return data;
    } catch (error) {
      console.log("Failed to fetch user in context: ", error);
      throw error;
    }
  };

  // Create a new user, update the user list and set currentUser
  const createUser = async (user: User): Promise<UserWithId> => {
    try {
      // Create user in Firestore
      const newUserDoc = await userClientServices.createUser(user);
      console.log("Create a new User in context: ", newUserDoc);
      // Add ID to the created user
      const newUser: UserWithId = { ...user, id: newUserDoc.id };
      setUser((prevUser) => [...prevUser, newUser]); // Add new user to the state
      setCurrentUser(newUser); // Set currentUser after creation
      return newUser;
    } catch (error) {
      console.log("Error to create a User in context: ", error);
      throw error;
    }
  };

  // Update a user and refresh the state
  const updateUser = async (userId: string, updateData: Partial<User>) => {
    try {
      await userClientServices.updateUser(userId, updateData);
      setUser((prevUser) =>
        prevUser.map((user) =>
          user.id === userId ? { ...user, ...updateData } : user
        )
      );
      if (currentUser?.id === userId) {
        setCurrentUser((prevUser) =>
          prevUser ? { ...prevUser, ...updateData } : null
        );
      }
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
      console.log(`Failed to delete user with ID: ${userId}`, error);
    }
  };

  console.log("currentUser in context: ", currentUser);
  console.log(user);
  // useEffect hook to fetch categories when the component mounts.
  // The empty dependency array `[]` ensures this effect runs only once.
  useEffect(() => {
    const loadUsers = async () => {
      try {
        await fetchUser();
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };
    loadUsers();
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
