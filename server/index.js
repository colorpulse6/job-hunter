const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("./passportConfig");
var path = require("path");


const PORT = process.env.PORT || 5000;

//Middleware
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());
app.set("view engine");
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "superman1",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000
    }
  })
);

app.use(express.static(path.join(__dirname, "public")));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());


//Register routes


const routes = require("./routes/routes");
app.use("/", routes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);



app.listen(PORT, () => {
  console.log(`server is running on port ${PORT})`);
});
