require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./routes");
const logger = require("morgan");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const db = require("./configs/db");


//Middlewares
app.use(logger("dev"));

//Setup database
db.connect();

//Setup req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  expressSession({
    secret: "keyboard cat",
    resave :false,
    saveUninitialized: true,
  })
);

//Start server
const port = app.get("port") || 4000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

//route init
route(app);


// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = error.status || 500;

  if (status === 404) {
    return res.render("404/notfound");
  }
  // respond to client
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});