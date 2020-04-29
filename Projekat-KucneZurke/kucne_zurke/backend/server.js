const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const url =
"mongodb+srv://MARSTeam:MARSTeam@cluster0-tgwsw.mongodb.net/test?retryWrites=true&w=majority";
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