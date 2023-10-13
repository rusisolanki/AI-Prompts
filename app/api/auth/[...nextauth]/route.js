import NextAuth from "next-auth";
// NextAuth.js is a complete open-source authentication solution for Next.js applications.It is designed from the ground up to support Next.js and Serverless.
import connectDB from "@utils/database.js";
import User from '@models/user.js'
import GoogleProvider from "next-auth/providers/google";
import { userAgent } from "next/server";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const currentUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = currentUser._id.toString();
      return session;
    },

    async signIn({ profile }) {
      //here as we are using the nextjs route which are serverless which means we do not need to run the server constantly instead the server is called when required
      try {
        await connectDB();
        //User exists
        const existingUser = await User.findOne({ email: profile.email });
        //User does not exist, create a new user
        if (!existingUser) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
