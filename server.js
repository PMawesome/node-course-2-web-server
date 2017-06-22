const express = require("express");

let app = express();

app.get("/", (req, res) => {
  // res.send("<h1>Hello Express!</h1>");
  res.send({
    name: "Peter",
    likes: ["Soccer", "Saufen"]
  });
});

app.get("/about", (req, res) => {
  res.send("About-Page");
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "An error occured"
  });
});

app.listen(3000);