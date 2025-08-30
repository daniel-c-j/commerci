import prisma from "./db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";

import NextAuth from "next-auth";
import { NextResponse } from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // ? 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        // const user = await prisma.user.findFirst({
        //   where: {
        //     email: credentials.email as string,
        //   },
        // });

        // if (user && user.password) {
        //   const isMatch = compareSync(
        //     credentials.password as string,
        //     user.password
        //   );

        //   if (isMatch) {
        //     return {
        //       id: user.id,
        //       name: user.name,
        //       email: user.email,
        //       role: user.role,
        //     };
        //   }
        // }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user, trigger }: any) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
    async jwt({ token, user, session }: any) {
      if (user) {
        token.role = user.role;

        // User has no name, use email.
        // TODO constant no name string
        if (user.name === "NULL_NAMED") {
          token.name = user.email.split("@")[0];

          // Update db to reflect token name
          // await prisma.user.update({
          //   where: { id: user.id },
          //   data: {
          //     name: token.name,
          //   },
          // });
        }
      }

      return token;
    },
    async authorized({ request, auth }: any) {
      console.log("kokl");
      // Check for session cart cookie
      if (!request.cookies.get("sessionCartId")) {
        const sessionCartId = crypto.randomUUID();

        // Clone the req headers
        const response = NextResponse.next({
          request: {
            headers: new Headers(request.headers),
          },
        });

        // Set newly generated SessioncartId in the response cookie.
        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
});
