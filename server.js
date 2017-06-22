const express = require("express");
const hbs = require("hbs");

let app = express();

// Handlebars-Plugin ("hbs") als View-Engine setzen
app.set("view engine", "hbs");

// statisches Directoty festlegen
app.use(express.static(__dirname + "/public"));

// Get-Request zu einer Resource
// app.get("/", (req, res) => {
//   // res.send("<h1>Hello Express!</h1>");
//   res.send({
//     name: "Peter",
//     likes: ["Soccer", "Saufen"]
//   });
// });

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    currentYear: new Date().getFullYear(),
    welcomeMessage: "Welcome to my Website!"
  });
});


// Seite mit Handlebars-Plugin rendern
app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page",
    currentYear: new Date().getFullYear()
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "An error occured"
  });
});

// Port festlegen, auf den Application listened
app.listen(3000, () => {
  console.log("Server is up on Port 3000.");
});
