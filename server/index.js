const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const { pool } = require("./dbConfig");
const PORT = process.env.PORT || 5000;

//Middleware

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(
  session({
    store: new pgSession({
      pool: pool,
    }),
    secret: "superman1",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000,
      secure: "auto",
    },
  })
);

app.use(express.json());
app.set("view engine");

//Register routes

const jobRoutes = require("./routes/job.routes");
app.use("/", jobRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/", eventRoutes);

const uploadRoutes = require("./routes/file-upload.routes");
app.use("/", uploadRoutes);

const tasksRoutes = require("./routes/tasks.routes");
app.use("/", tasksRoutes);

const preperationRoutes = require("./routes/preperation.routes");
app.use("/", preperationRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);


// All remaining requests return the React app, so it can handle routing.
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});



app.listen(PORT, () => {
  console.log(`server is HOT HOT HOT on port ${PORT}`);
});
