import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials, req) {
        const { username, password } = credentials as any;

        let res: any
        try {
          res = await fetch("https://meek-tapioca-6d8496.netlify.app/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
              isRemember: false,
            }),
          });
        } catch (err) {
          console.log(err);
        }

        const user = await res.json();

        if (user) {
          // user.is_admin = true;
          return user;
        }
        if (!user) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },

  secret: process.env.SECRET,

  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
