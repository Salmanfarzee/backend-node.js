const express = require("express");
require("./models");
const routes = require("./routes");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.post("auth/login", (req, res) => {
  res.send("its get login");
});
app.post("signup", (req, res) => {
  res.send("get signup");
});
app.get("vendors", (req, res) => {
  res.send("its get vendor");
});
app.post("vendors", (req, res) => {
  res.send(req.body);
});
app.use("/", routes);

app.listen("4000 ", () => {
  console.log("app is running in port 4000");
});
