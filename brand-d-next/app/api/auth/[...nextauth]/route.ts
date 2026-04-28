import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simple fixed password for MVP admin access
        // In production, use database checks and hashed passwords
        if (credentials?.password === process.env.ADMIN_PASSWORD || credentials?.password === "brand-admin") {
          return { id: "1", name: "Admin" };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    // Custom login page can be added here later
    // signIn: '/admin/login' 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.name = token.id as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
