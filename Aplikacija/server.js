const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const url =
  "mongodb+srv://admin:admin@marsteam-n0zdg.mongodb.net/test?retryWrites=true";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database connected succesfully.");
});

const usersRouter = require("./routes/users.js");

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
