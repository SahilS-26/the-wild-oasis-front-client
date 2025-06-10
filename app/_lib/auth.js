import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // -- Authorized() will automatically get called.
    // 1. Param - auth (current session).
    // 2. Param - request (contains cookies & headers)
    authorized({ auth, request }) {
      // operator !! simply make the values boolean
      return !!auth?.user;
    },

    // -- signIn() is simply work like a middleware, when user signin and this signIn() gets called and once it finished return 'true' then it will signed-in user AND if retruns 'false' it won't proceed.
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getGuest(user.email);

        if (!existingUser)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },

    // -- session() always run after the singIn callback
    // 1. Param@1 - session - is the auth object contains user details.
    async session({ session, user }) {
      const guest = await getGuest(session?.user?.email);
      session.user.guestId = guest.id;
      return session;
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
