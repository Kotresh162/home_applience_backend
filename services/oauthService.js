const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://your-oauth-server.com/auth',
  tokenURL: 'https://your-oauth-server.com/token',
  clientID: 'your-client-id',
  clientSecret: 'your-client-secret',
  callbackURL: 'http://localhost:3000/auth/callback'
},
function(accessToken, refreshToken, profile, done) {
  // Store user info or token as necessary
  return done(null, profile);
}));

module.exports = passport;
