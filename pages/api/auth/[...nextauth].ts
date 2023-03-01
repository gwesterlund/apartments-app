import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  secret: "wFX4KcYukIHns1DhOAY2ohTuKva1Xbmvx8QCIz8puh0=",
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const users = [
          {
            username: "l1",
            email: "test-landlord-1@gmail.com",
            displayName: "Test Landlord 1",
            accountType: "LANDLORD",
          },
          {
            username: "p1",
            email: "test-prospect-1@gmail.com",
            displayName: "Test Prospect 1",
            accountType: "PROSPECT", // future tenant? just looking?
          },
          {
            username: "t1",
            email: "test-tenant-1@gmail.com",
            displayName: "Test Tenant 1",
            accountType: "TENANT",
          },
          {
            username: "t2",
            email: "test-tenant-2@gmail.com",
            displayName: "Test Tenant 2",
            accountType: "TENANT",
          },
        ];

        return users.find((e) => e.username === credentials.username);
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // The user argument is only passed the first time this callback is called on a new session, after the user signs in
      if (user) {
        // Add a new prop on token for user data
        token.userData = {
          displayName: user.displayName,
          accountType: user.accountType,
        };
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.user = {
        email: token.email,
        ...token.userData,
      };
      return Promise.resolve(session);
    },
  },
};

export default NextAuth(authOptions);
