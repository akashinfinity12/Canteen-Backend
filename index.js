const express = require("express");
require("express-async-errors");
const app = express();
const config = require("config");
const cors = require("cors");
const mongoose = require("mongoose");
const foods = require("./routes/foods");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL Error: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost/canteen")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error Occured: " + err));

app.use(express.json());
app.use(cors());
app.use("/api/foods", foods);
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use(error);

app.get("/", (req, res) => {
  res.send("Welcome to the RESTful Servies of Canteen System");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to port number ${port}`));
