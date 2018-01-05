const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const dotenv = require('dotenv');

const { secret } = require("./config").session;
const { domain, clientID, clientSecret } = require("./config.js").auth0;

const port = 3001;
const { connectionString } = require("./config").massive;
const app = express();

dotenv.config();

app.use(function(req, res, next){
  console.log(req.path)
  next()
})


app.use(express.static(`${__dirname}/../build`));

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
    successRedirect: "/"
  })
);

app.get("/logout", function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

app.get("/api/paySuccess", (req, res, next) => { 
  if(!req.session.cart) req.session.cart = [];
  let rqspuv = null;
  if(!req.session.passport){
  console.log("user doesnt exist")
  } else {rqspuv = req.session.passport.user.vintage_user_id};
  const rss = req.session.shippingInfo
  const total = req.session.cart.length ? req.session.cart.reduce(function(acc, item){
    return acc + parseFloat(item.price);
  }, 0):0;
  req.session.purchases = [...req.session.cart];
  const rsc = [...req.session.cart];
  req.app.get("db")
  .addOrderByShipping([rss.firstName, rss.lastName, rss.streetAddress, rss.apt, rss.city, rss.stateName, rss.zip, total, rss.email, rqspuv])
    .then(response => {

      const orderId = response[0].order_id;
      for(var i = 0; i < rsc.length; i++){


      req.app.get("db")
      .addOrderLineByPurchases([orderId ,rsc[i].product_id, rsc[i].price])
        .then(response => {
         res.json(response).catch(console.log);
      })
    }
      res.json(response[0].order_id).catch(console.log);
  })

  //for(var i = 0; i < req.session.cart.length; i++){

  // console.log("aoLBP", [orderId ,req.session.cart[i].product_id, req.session.cart[i].product_price])
  // req.app.get("db")
  // .addOrderLineByPurchases([orderId ,req.session.cart[i].product_id, req.session.cart[i].product_price])
  //   .then(response => {
  //    res.json(response).cath(console.log);
  // })
//}
  

  delete req.session.cart;
  delete req.session.shippingInfo;
  res.redirect('/');
});

app.get("/api/me", function(req, res) {
  if (!req.user) return res.status(404);

  res.status(200).json(req.user);
});

app.get("/api/session", function(req, res) {
  if (!req.session) return res.status(404);

  res.status(200).json(req.session);
});

app.get("/api/cart", (req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  res.json(req.session.cart);
});

app.get("/api/faves", (req, res, next) => {
  if (!req.session.faves) req.session.faves = [];
  res.json(req.session.faves);
});



app.delete("/api/cart/:id", (req, res, next) => {
  const deleteID = req.params.id;
  
  remove = () => {
    for(var i = 0; i < req.session.cart.length; i++){
      console.log("in the remove endpoint in server", req.session.cart[i].product_id, deleteID)
      
      if(req.session.cart[i].product_id == deleteID){
        console.log("in the loop in server", req.session.cart[i].product_id, deleteID)
        req.session.cart.splice(i,1);
        return req.session.cart; 
      }
    }
  }
  req.session.cart = remove();

  res.json(req.session.cart);
});

app.post("/api/cart", (req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  req.session.cart.push(req.body);
  res.json(req.session.cart);
});

app.post("/api/faves", (req, res, next) => {
  if (!req.session.faves) req.session.faves = [];
  req.session.faves.includes(req.body.id)?
  console.log("favorite already in list")
  :req.session.faves.push(req.body.id);
  res.json(req.session.faves);
});

app.delete("/api/faves/:id", (req, res, next) => {
  const deleteID = req.params.id;
  req.session.faves = req.session.faves.filter(function(x){
    return x != deleteID
  })
  res.json(req.session.faves);
});

app.get("/api/orders/:id", (req, res, next) => {
  req.app
  .get("db")
  .getOrdersByUserId([req.params.id])
  .then(response => {
    res.json(response);
  })
  .catch(console.log);
})

app.post("/api/shippingInfo", (req, res, next) => {
  if (!req.session.shippingInfo) req.session.shippingInfo = {};
  req.session.shippingInfo = req.body;
  res.json(req.session.shippingInfo);
})
 
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


const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})


app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});