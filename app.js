var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const envConfig = require("dotenv").config(); 
const expressLayouts = require("express-ejs-layouts"); 

// ROUTES
var userRouter = require('./routes/RoutesForUsers.js');
var buyerRouter = require('./routes/RoutesForBuyer.js');
var adminRouter = require('./routes/RoutesForAdmin.js');

var app = express();

/* ================================
   VIEW ENGINE
================================ */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts); 
app.set("layout", "layout-defaultni"); 

/* ================================
   MIDDLEWARE
================================ */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist")) );


app.use('/jquery',
    express.static( path.join(__dirname, 'node_modules/jquery/dist')));



/*=================================
   DATABASE  ovdje dodaj onaj onm 
  ================================= */



/* ================================
   AUTH MIDDLEWARE  cokiee
================================ */
const publicPaths = [
      "/users/usersLogin",
      "/users/usersRegister",
      "/users/RegisterUser",
      "/users/LoginUser"];

app.use((req,res,next) => {
         
      //[1, 3, 5].some(n => n % 2 === 0)   -> false 
   if (publicPaths.some((p) => req.path.startsWith(p))) {
    return next();
  }
  

   // Uzmi cookie
  const user = req.signedCookies.user;

   
  // Ako nema cookie → blokiraj
  if (!user) {
    console.log("⛔ NO USER COOKIE – redirecting to login");

    // Ako je GET zahtjev → redirect
    if (req.method === "GET") {
      return res.redirect("/users/usersLogin");
    }

    // Ako je AJAX (POST/PUT/DELETE) → vrati JSON
    return res.status(403).json({ error: "Not authorized" });
  }

   // Ako postoji cookie → user je logovan
  req.user = user;

  console.log("✔ AUTHORIZED USER:", user.email);
  next();
});


/* ================================
   ROUTES
================================ */

app.use("/users",userRouter);
app.use("/buyer",buyerRouter);
app.use("/admin",adminRouter);

/* ================================
   ERROR HANDLERS
================================ */
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//terminal 1:npm run dev
//terminal 2:npm run sync