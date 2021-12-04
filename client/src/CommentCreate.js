import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      `http://localhost:4001/posts/${postId}/comments`,
      {
        content: content,
      }
    );
    console.log(result);
  };
  return (
    <div className="form-group">
      <form onSubmit={onSubmit}>
        <label>Create Comment</label>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-success" type="submit">
          CreateComment
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;
