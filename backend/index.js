const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const mongo_uri = require("./config/config").MONGO_URI;

//import routes
const Routes = require("./routes");

const app = express();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("runValidators", true);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

var allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not  exists" +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },

    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],

    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    status: "up",
    message: "server is running",
  });
});

//routes
app.use("/chat", Routes);
// Status Check  http://localhost:8000/api/v1/lead

mongoose
  .connect("mongodb://deepan:chatDB123@ds261040.mlab.com:61040/chat", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
  console.log("app listening on port " + PORT);
});

module.exports = app;
