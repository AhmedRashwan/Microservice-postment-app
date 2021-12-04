import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState({});

  const fetchComments = async () => {
    let res = await axios.get(`http://localhost:5001/posts/${postId}/comments`);
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderComments = Object.values(comments).map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });
  return <ul>{renderComments}</ul>;
};

export default CommentList;
