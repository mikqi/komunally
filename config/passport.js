const passport = require('passport')
const { Strategy: FacebookStrategy } = require('passport-facebook')

const User = require('../models/User')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Return an error message already logged in.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and update user data.
 *     - Else create a new account.
 */

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['name', 'email', 'link'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  console.log("DEBUG Facebook Login")
  console.log("DEBUG Token", accessToken, refreshToken)
  console.log("DEBUG User:", req.user)
  console.log("DEBUG Profile:", profile)
  if (req.user) {
      req.flash('errors', { msg: 'You are already logged in.' })
      done(null, req.user)
  }
  else {
    User.findOne({ facebook: profile.id }, (err, existingUser) => {
      if (err) { return done(err) }
      const user = existingUser || new User()
      user.email = profile._json.email
      user.facebook_id = profile.id
      user.tokens = [{ kind: 'facebook', accessToken }]
      user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`
      user.profile.first_name = user.profile.first_name || `${profile.name.givenName}`
      user.profile.last_name = user.profile.last_name || `${profile.name.familyName}`
      user.profile.link = user.profile.link || `${profile._json.link}`
      user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture`
      user.save((err) => {
        done(err, user)
      })
    })
  }
}))

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0]
  const token = req.user.tokens.find(token => token.kind === provider)
  if (token) {
    next()
  } else {
    res.redirect(`/auth/${provider}`)
  }
}
