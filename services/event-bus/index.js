const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const posts = [];
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;
  try {
    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    // axios.post("http://localhost:5000/events", event);

    if (event.type === "postCreated") {
      const { id, title } = req.body;

      posts[id] = { id, title, comments: [] };
    } else if (event.type === "commentCreated") {
      const { postId, id, content } = req.body;
      const post = posts[postId];
      post.comments.push({ id, content });
    } else {
    }
    res.send({ posts: posts });
  } catch (error) {
    res.status(500).send({ error });
  }
});
app.listen(5000, () => {
  console.log("event bus working now...");
});
