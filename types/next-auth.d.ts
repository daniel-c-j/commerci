import { DefaultSession } from "next-auth";

// Extending the user obj with role property

declare module "next-auth" {
  export interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}
