const http = require("http");
const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const jsobj = require("./jsobj");
const path = require("path");

const app = express();

// app
// problem1
app.get("/html", (req, res) => {
  res.sendFile(path.join(__dirname, "sample.html"));
  res.end();
});

//problem2
app.get("/json", (req, res) => {
  res.json(jsobj);
  res.end();
});
app.get("/status/:id", (req, res) => {
  if (typeof Number(req.params.id) === "number") {
    res.send(req.params.id);
    res.status(Number(req.params.id));
  } else {
    res.send("error");
  }
  res.end();
});
app.get("/delay/:sec", (req, res) => {
  let ti = Number(req.params.sec);
  if (typeof ti === "number") {
    setTimeout(() => {
      res.send(res.statusCode);
    }, ti * 1000);
  }
});
app.get("/uuid", (req, res) => {
  let id = crypto.randomUUID();
  res.json(`{ uuid : ${id}}`);
});
app.listen(8000, () => {
  console.log("listening at port 8000");
});
