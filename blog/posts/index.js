const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  const post = {
    id,
    title,
  };
  posts[id] = post;
  const createPostEvent = {
    type: "createPostEvent",
    body: post,
  };
  try {
    axios.post("http://localhost:4003/event-bus/event", createPostEvent);
  } catch (e) {
    console.log("inside error", e.message);
  }
  res.status(201).send(post);
});
app.post("/event", (req, res) => {
  // observing event from event-bus
  res.send();
});

app.listen(4000, () => {
  console.log("Listening posts microservice on 4000");
});
