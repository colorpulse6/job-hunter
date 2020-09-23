const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session)
const {pool} = require("./dbConfig")
const PORT = process.env.PORT || 5000;
require("dotenv").config();

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
    store: new pgSession({
      poop:pool
      

    }),

    secret: "superman1",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000
    }
  })
);



//Register routes


const routes = require("./routes/routes");
app.use("/", routes);

const authRoutes = require("./routes/auth.routes");
const { default: userEvent } = require("@testing-library/user-event");
app.use("/", authRoutes);



app.listen(PORT, () => {
  console.log(`server is running on port ${PORT})`);
});
