const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/event", (req, res) => {
  // observing event from event-bus
  const { type, body } = req.body;
  console.log("Moderation events", { type, body });
  if (type === "createCommentEvent") {
    const { content } = body;
    let isCommentAccepted = true;
    if (content.toLowerCase().includes("orange")) {
      isCommentAccepted = false;
    }
    const updateCommentEvent = {
      type: "updateCommentEvent",
      body: {
        ...body,
        status: isCommentAccepted ? "approved" : "rejected",
      },
    };
    axios
      .post("http://localhost:4003/event-bus/event", updateCommentEvent)
      .catch((e) => console.log(e.message));
  }
  res.send();
});

app.listen(4004, () => {
  console.log("Listening comment moderation microservice on 4004");
});
