const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();
const commentsByPostId = {};

app.use(cors());
app.use(bodyParser.json());
/**
 *
 */
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});
/**
 *
 */
app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  await axios
    .post("http://localhost:5000/events", {
      type: "commentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
      },
    })
    .then(() => {
      console.log("Message sent successfully");
    })
    .catch((err) => {
      console.log("Comment service error" + err);
    });

  app.post("/events", (req, res) => {
    console.log("Event Received", req.body.type);
  });
  res.status(201).send(commentsByPostId[req.params.id]);
});

app.post("/events", (req, res) => {
  console.log("Event Received", req.body.type);
});
/**
 *
 */
app.listen(4001, () => {
  console.log("comment service working successfully");
});
