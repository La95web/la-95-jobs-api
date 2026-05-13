import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../prisma/client";
import dotenv from "dotenv";

console.log("BASE_URL:", process.env.BASE_URL);
console.log("Callback URL:", `${process.env.BASE_URL}/auth/google/callback`);

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const email = profile.emails?.[0].value;
      const name = profile.displayName;

      if (!email) return done(new Error("No email found"), undefined);

      let user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            provider: "google",
          },
        });
      }

      return done(null, user);
    }
  )
);

export default passport;
