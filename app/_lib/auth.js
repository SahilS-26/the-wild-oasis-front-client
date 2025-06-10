import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // Authorized() will automatically get called.
    // 1. Param - auth (current session).
    // 2. Param - request (contains cookies & headers)
    authorized({ auth, request }) {
      // operator !! simply make the values boolean
      return !!auth?.user;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
