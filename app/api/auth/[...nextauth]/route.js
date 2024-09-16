import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/user';
import { connectTODB } from '@/utils/database';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })],
     secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async session({ session }) {
      // console.log("Session callback called", session);
      const sessionUser = await User.findOne({ email: session.user.email });
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }
      
      return session;
    },
    async signIn({ profile }) {
      console.log("SignIn callback called", profile);
      try {
        await connectTODB();
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message,profile.name);
        return false;
      }
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };