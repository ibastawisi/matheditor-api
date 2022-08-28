import 'dotenv/config';

const FRONTEND_URL = process.env.FRONTEND_URL;
const DATABASE_URL = process.env.DATABASE_URL;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const PORT = process.env.PORT || 3001;
const SECRET = process.env.SECRET;

export {
  FRONTEND_URL,
  DATABASE_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  PORT,
  SECRET,
}