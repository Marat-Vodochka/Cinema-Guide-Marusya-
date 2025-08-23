// user type
export interface User {
  id: string;
  name?: string;
  surname?: string;
  email: string;
  favorites: string[];
}

// Login data
export type LoginCredentials = {
  email: string;
  password: string;
};

// registration data
export type RegisterPayload = {
  email: string;
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
};

// registration data for authentication
export type RegisterDataForAuth = {
  email: string;
  password: string;
  name?: string;
};

export type AuthStatus = "idle" | "loading" | "succeeded" | "failed";
