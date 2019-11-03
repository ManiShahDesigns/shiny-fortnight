if (process.env.NODE_ENV !== "production") {
  require("dotenv").parse();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const indexRouter = require("./routes/index");

// Setup view engine
app.set("view engine", "ejs");

// Import views
app.set("views", __dirname + "/views");
app.set("layouts", "layouts/layout");

app.use(expressLayouts);
app.use(express.static("public"));

// Mongoose configuration
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to mongoose"));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
