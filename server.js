var express = require("express");
var accessDoor = require("./accessDoor");
var app = express();

app.get("/:id/:name", accessDoor);
app.get("/:id", accessDoor);

app.listen(3000);
