import passport from "passport";
import { Router } from "express";

const router = Router();

router.get('/login', passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account'
}));

router.get('/logout', (req, res) => {
  req.logout({ keepSessionInfo: false }, () => {
    res.status(200).end();
  });
});

router.get('/redirect',
  passport.authenticate('google', {
    failureMessage: 'cant login with google, try again later',
  }),
  async (req, res) => {
    res.send(`
    <script>
      if (window.opener) {
        window.opener.postMessage({ type: 'auth' }, '*');
        window.close();
      } else {
        setTimeout(() => window.location.href = '/', 1000);
      }
    </script>`);
  });

export default router;