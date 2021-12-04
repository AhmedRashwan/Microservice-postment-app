const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();
const posts = {};

app.use(cors());
app.use(bodyParser.json());
/**
 *
 */
app.get("/posts", (req, res) => {
  res.send(posts);
});
/**
 *
 */
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  posts[id] = { id, title: req.body.title };

  await axios.post("http://localhost:5000/events", {
    type: "postCreated",
    data: {
      id,
      title: req.body.title,
    },
  });
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event Received", req.body.type);
});
/**
 *
 */
app.listen(4000, () => {
  console.log("post service working successfully");
});
