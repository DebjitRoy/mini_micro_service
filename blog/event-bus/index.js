const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/event-bus/event", (req, res) => {
  const { type, body } = req.body;
  console.log({ type, body });
  // post service
  axios.post("http://localhost:4000/event", req.body).catch((err) => {
    console.log(err.message);
  });
  // comment service
  axios.post("http://localhost:4001/event", req.body).catch((err) => {
    console.log(err.message);
  });
  // query service
  axios.post("http://localhost:4002/event", req.body).catch((err) => {
    console.log(err.message);
  });
  // moderation service
  axios.post("http://localhost:4004/event", req.body).catch((err) => {
    console.log(err.message);
  });
  res.status(200).send({ status: "OK" });
});

app.listen(4003, () => {
  console.log("Listening event-bus microservice on 4003");
});
