const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

const { secret } = require("../config").session;
const { domain, clientID, clientSecret } = require("../config.js").auth0;

const port = 3001;
const { connectionString } = require("../config").massive;
const app = express();

//app.use(express.static(`${__dirname}/build`));

const SERVER_CONFIGS = require('./constants/server');

const configureServer = require('./server');
const configureRoutes = require('./routes');

configureServer(app);
configureRoutes(app);

let count = 0;



app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
 console.log("SESSION", req.session);
 console.log('COUNT', count);
 count+=1;
  next();
});

massive(connectionString)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain,
      clientID,
      clientSecret,
      callbackURL: "/login"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      app
        .get("db")
        .getUserByAuthId(profile.id)
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUserByAuth([profile.id, profile.displayName])
              .then(created => {
                console.log('CREATED', created);
                return done(null, created[0]);
              });
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get("/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/"
  })
);

app.get("/logout", function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("http://localhost:3000/");
});

app.get("/api/paySuccess", (req, res, next) => {
  console.log("------------------------------------------------------------------------------------------",req.session.cart)
  // if(!req.session.cart) req.session.cart = [];
  req.session.purchases = [...req.session.cart];
  console.log("before the delete",req.session)
  delete req.session.cart;
  console.log(req.session)
  res.redirect('http://localhost:3000');
  // res.json(req.session.purchases);
} )

app.get("/api/me", function(req, res) {
  console.log(req.user);
  if (!req.user) return res.status(404);
  res.status(200).json(req.user);
});

app.get("/api/cart", (req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  console.log('IN GET: ', req.session.cart);
  res.json(req.session.cart);
});

app.delete("/api/cart/:id", (req, res, next) => {
  const deleteID = req.params.id;
  const newCart = req.session.cart.filter(
    function(elem, index){
      return (elem.product_id != deleteID)
    }  
  );
  console.log('in rem from cart', newCart);
  res.json(newCart);
});

app.post("/api/cart", (req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  console.log('IN POST: ', req.session.cart);
  req.session.cart.push(req.body);
  res.json(req.session.cart);
});
 
app.get("/api/departments/:dep", function(req, res) {
  req.app
    .get("db")
    .getProductsByDep([req.params.dep])
    .then(response => {
      res.json(response);
    })
    .catch(console.log);
});

app.get("/api/departments/filler/:dep", function(req, res) {
  req.app
    .get("db")
    .get4ProductsByDep([req.params.dep])
    .then(response => {
      res.json(response);
    })
    .catch(console.log);
});

app.get("/api/details/:productId", function(req, res) {
  req.app
    .get("db")
    .getProductById([req.params.productId])
    .then(response => {
      res.json(response);
    })
    .catch(console.log);
});

app.get("/api/test", (req, res, next) => {
  req.app
    .get("db")
    .getUsers()
    .then(response => {
      res.json(response);
    })
    .catch(console.log);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
