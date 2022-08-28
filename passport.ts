import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } from "./env";
import { createUser, findUserByGoogleId, findUserById } from "./repositories/user";

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID!,
  clientSecret: GOOGLE_CLIENT_SECRET!,
  callbackURL: GOOGLE_CALLBACK_URL,
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  const userDefaults = {
    googleId: profile.id,
    name: profile.displayName,
    email: profile.emails![0].value,
    picture: profile.photos![0].value
  }
  try {
    const user = await findUserByGoogleId(profile.id) || await createUser(userDefaults);
    return done(null, user)
  } catch (error: any) { done(error); }
}));

passport.serializeUser((user: any, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await findUserById(id);
  return done(null, user);
});
