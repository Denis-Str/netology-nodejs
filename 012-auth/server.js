const express = require('express')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('./db')

const verify = (username, password, done) => {
  db.users.findByUsername(username, (err, user) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false)
    }

    if (!db.users.verifyPassword(user, password)) {
      return done(null, false)
    }

    return done(null, user)
  })
}

const options = {
  usernameField: "username",
  passwordField: "password",
}

passport.use('local', new LocalStrategy(options, verify))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

// эти данные будут оставлены для работы с сессией
passport.deserializeUser((id, cb) => {
  db.users.findById(id, (err, user) => {
    if (err) {
      return cb(err)
    }
    cb(null, user)
  })
})

const app = express()
app.set('view engine', 'ejs')

app.use(express.urlencoded());
app.use(session({secret: 'SECRET'}));

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.render('home', {user: req.user})
})

// /api/user/login
app.get('/api/user/login', (req, res) => {
  res.render('login')
})
// /api/user/login
app.post('/api/user/login',
  passport.authenticate('local', {failureRedirect: '/login'}),
  (req, res) => {
    console.log("req.user: ", req.user)
    res.redirect('/')
  })

// /api/user/signup
app.get('/api/user/signup', (req, res) => {
  req.logout()
  res.redirect('/')
})

// /api/user/me
app.get('/api/user/me',
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/api/user/login')
    }
    next()
  },
  (req, res) => {
    res.render('profile', {user: req.user})
  }
)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})