const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const foods = require("./routes/foods");

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost/canteen")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error Occured: " + err));

app.get("/", (req, res) => {
  res.send("Welcome to the RESTful Servies of Canteen System");
});

app.use("/api/foods", foods);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to port number ${port}`));
