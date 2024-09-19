export interface User {
  userName: string;
  //id: string;
}

export interface UserWithId extends User {
  id: string;
}
