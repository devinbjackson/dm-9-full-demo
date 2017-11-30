const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

const { secret } = require("./config").session;
const { domain, clientID, clientSecret } = require("./config.js").auth0;

const port = 3001;
const { connectionString } = require("./config").massive;
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

app.get("/api/paySuccess", (req, res, next) => {  // if(!req.session.cart) req.session.cart = [];
  const rss = req.session.shippingInfo
  const total = req.session.cart.length ? req.session.cart.reduce(function(acc, item){
    return acc + parseFloat(item.price);
  }, 0):0;
  req.session.purchases = [...req.session.cart];
  const rsc = [...req.session.cart];
  req.app.get("db")
  .addOrderByShipping([rss.firstName, rss.lastName, rss.streetAddress, rss.apt, rss.city, rss.stateName, rss.zip, total])
    .then(response => {

      const orderId = response[0].order_id;
      console.log("dagffdsgdfgsdfgdfsgsdfg",rsc)

      for(var i = 0; i < rsc.length; i++){


      req.app.get("db")
      .addOrderLineByPurchases([orderId ,rsc[i].product_id, rsc[i].price])
        .then(response => {
         res.json(response).cath(console.log);
      })
    }

      console.log("aobs rezzzzzzdata", response[0].order_id, typeof response[0].order_id)
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
  res.redirect('http://localhost:3000');
});

app.get("/api/me", function(req, res) {

  if (!req.user) return res.status(404);

  res.status(200).json(req.user);
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
  req.session.cart.splice(req.session.cart.indexOf(req.session.cart.product_id === deleteID),1);
  console.log('in rem from cart', req.session.cart);
  res.json(req.session.cart);
});

app.post("/api/cart", (req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  req.session.cart.push(req.body);
  res.json(req.session.cart);
});

app.post("/api/faves", (req, res, next) => {
  if (!req.session.faves) req.session.faves = [];
  console.log("in fave post", req.body.id)
  req.session.faves.push(req.body.id);
  res.json(req.session.faves);
});

app.delete("/api/faves/:id", (req, res, next) => {
  const deleteID = req.params.id;
  console.log("delId", deleteID, typeof deleteID)
  req.session.faves = req.session.faves.filter(function(x){
    console.log("x=",x, typeof x);
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
  console.log(req.session.shippingInfo)
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

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
