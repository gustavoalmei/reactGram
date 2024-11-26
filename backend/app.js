require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

// config JSON and form with response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solved CORS
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// db connection
require("./config/db.js");

// test route
app.get("/", (req, res) => {
  res.send("API Working!");
});

// routes
const router = require("./routes/Router.js");
app.use(router);

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
