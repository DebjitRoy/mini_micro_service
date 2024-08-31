const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// example:
// {[postId]:[{id, conetent}]}

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostId[id] || [];
  res.send(comments);
});
app.post("/posts/:id/comments", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comment = {
    id,
    content,
  };

  const { id: postId } = req.params;
  if (!commentsByPostId[postId]) {
    commentsByPostId[postId] = [];
  }

  const comments = commentsByPostId[postId] || [];

  commentsByPostId[postId] = [...comments, comment];
  const createCommentEvent = {
    type: "createCommentEvent",
    body: {
      postId,
      ...comment,
    },
  };
  axios
    .post("http://localhost:4003/event-bus/event", createCommentEvent)
    .catch((e) => console.log(e.message));
  res.status(201).send(comment);
});
app.post("/event", (req, res) => {
  // observing event from event-bus
  res.send();
});

app.listen(4001, () => {
  console.log("Listening comments microservice on 4001");
});
