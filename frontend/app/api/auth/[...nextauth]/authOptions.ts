import { NextAuthOptions, Session } from "next-auth";
import LineProvider from "next-auth/providers/line";

interface LineProfile {
    userId: string; role: string; name: string; picture: string; lineId: string; 
}

export const authOptions: NextAuthOptions = {
  providers: [
    LineProvider({
      clientId: process.env.LINE_CHANNEL_ID!,
      clientSecret: process.env.LINE_CHANNEL_SECRET!,
    })
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ profile })
          }
        );
        const data = await res.json();

        token.user = data.user as LineProfile;         
        token.access_token = account.access_token; 
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user as LineProfile;
      session.access_token = token.access_token as string;
      return session;
    }
  }
};
