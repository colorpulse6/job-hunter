const express = require("express");
const app = express();
const cors = require("cors");
const auth = require("./auth");
const { pool } = require("./dbConfig");

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

//Register routes
const routes = require("./routes/routes");
app.use("/", routes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT})`);
});

//Postgres sever - 5001
