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
  res.send("we are here1");
  // res.send(posts);
});
/**
 *
 */
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  posts[id] = { id, title: req.body.title };
  try {
    await axios
      .post("http://localhost:5000/events", {
        type: "postCreated",
        data: {
          id,
          title: req.body.title,
        },
      })
      .then(() => {
        console.log("createPost event sent successfully");
      })
      .catch((err) => {
        console.log("CreatePost event Failed", err);
        res.status(500).send({ err });
      });
    res.status(201).send(posts[id]);
  } catch (error) {
    res.status(400).send(error);
  }
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
