const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

// Heroku-Port oder 3000 verwenden
const port = process.env.PORT || 3000;

let app = express();

// Verwendung von Partials (=Unter-Templates) enablen
hbs.registerPartials(__dirname + "/views/partials");

// Handlebars-Plugin ("hbs") als View-Engine setzen
app.set("view engine", "hbs");

// eigene Middleware nutzen
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", (error) => {
    if(error)
      console.log("Unable to append to server.log");
  });
  next();  // beendet die Middleware und geht zur nächsten -> notwendig, weil sonst nichts ausgeliefert wird!!!
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

// statisches Directoty festlegen
app.use(express.static(__dirname + "/public"));

// Helper-Funktion, um die Daten des aktuellen Jahres nur einmal bereitstellen zu müssen
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
});

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
    welcomeMessage: "Welcome to my Website!"
  });
});


// Seite mit Handlebars-Plugin rendern
app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "An error occured"
  });
});

// Port festlegen, auf den Application listened
app.listen(port, () => {
  console.log(`Server is up on Port ${port}.`);
});
