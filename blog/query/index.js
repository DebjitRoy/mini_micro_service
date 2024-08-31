const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});
app.post("/event", (req, res) => {
  // observing event from event-bus
  const { type, body } = req.body;
  console.log("Query events", { type, body });
  switch (type) {
    case "createPostEvent":
      const { id, title } = body;
      posts[id] = {
        id,
        title,
        comments: [],
      };
      break;
    case "createCommentEvent":
      const { postId, id: commentId, content } = body;
      if (posts[postId]) {
        posts[postId].comments.push({
          id: commentId,
          content,
          status: "pending",
        });
      }
      break;
    case "updateCommentEvent":
      const { postId: updatePostId, id: updateCommentId } = body;
      if (posts[updatePostId]) {
        const updateIndex = posts[updatePostId].comments.findIndex(
          (comment) => comment.id === updateCommentId
        );
        posts[updatePostId].comments.splice(updateIndex, 1, body);
      }
      break;
  }
  res.send();
});

app.listen(4002, () => {
  console.log("Listening query microservice on 4002");
});
