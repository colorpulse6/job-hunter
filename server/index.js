const express = require("express");
const app = express();
const cors = require("cors");

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const { pool } = require("./dbConfig");
const PORT = process.env.PORT || 5000;

//Middleware

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", 'chrome-extension://lklhmabhoeepnmbpnoamkgjfccgjhibb'); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     credentials: true,
//   })
// );
// app.use(
//   cors({
//     origin: ['chrome-extension://lklhmabhoeepnmbpnoamkgjfccgjhibb'],
//     credentials: true,
//   })
// );

// app.use(cors());


var whitelist = ["chrome-extension://lklhmabhoeepnmbpnoamkgjfccgjhibb", "http://localhost:3000", "https://job-toast.herokuapp.com", 'http://localhost:4000'];
var corsOptions = {
    origin: whitelist,
    credentials:true,
    exposedHeaders: ["set-cookie"]
};

app.use(cors(corsOptions));

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Origin', '*');  // add this line  
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// })

app.use(
  session({
    store: new pgSession({
      pool: pool,
    }),
    secret: "superman1",
    resave: true,
    saveUninitialized: false,
    cookie: {
      domain:'lklhmabhoeepnmbpnoamkgjfccgjhibb',
      maxAge: 60 * 60 * 24 * 1000,
      secure: true,
      httpOnly: false,
      sameSite:'none',
      proxy:false
      
    },
  })
);

app.use(express.json());
app.set("view engine");




// //WebSockets
// const WebSocket = require('ws')

// const wss = new WebSocket.Server({ port: 8080 })

// wss.on('connection', ws => {
//   ws.on('message', message => {
//     console.log(`Received message => ${message}`)
//     console.log(`server is HOT HOT HOT on port port 8080`);
//   })
//   ws.send('ho!')
// })



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

if (process.env.NODE_ENV === "production") {
  console.log("In Production Mode:" + process.NODE_ENV);

  const path = require("path");

  const buildDir = path.join(__dirname, "../client/build");

  app.use(express.static(buildDir));

  app.get("*", (req, res) => {
    res.sendFile(path.join(buildDir, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server is HOT HOT HOT on port ${PORT}`);
});
