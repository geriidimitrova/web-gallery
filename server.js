require('dotenv').config();

const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const db = require("./app/models");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};
var publicDir = require('path').join(__dirname,'/public'); 

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

app.use(express.static(publicDir)); 

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to WG API" });
});

const auth = require("./app/controllers/auth.controller");
app.post("/login", auth.login);

const users = require("./app/controllers/user.controller");
app.post("/users", users.create);
app.get("/users", users.findAll);
app.put("/users/:id", users.update);

const items = require("./app/controllers/item.controller.js");
app.post("/items", items.create);
app.get("/items", items.findAll);
app.get("/items/approved", items.findAllApproved);
app.get("/items/rejected", items.findAllRejected);
app.get("/items/applications", items.findAllApplications);
app.put("/items/:id/approve", items.approve);
app.put("/items/:id/reject", items.reject);

const events = require("./app/controllers/event.controller.js");
app.get("/events", events.findAll);
app.get("/events/:id", events.findOne);
app.post("/events", events.create);
app.put("/events/:id", events.update);
app.delete("/events/:id", events.delete);
app.delete("/events", events.deleteAll);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
