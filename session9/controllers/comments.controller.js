const comments = require("../db/comments.json");

const getCommentByPost = (postId) => {
  let comment = comments.filter((comm) => 
    comm.postId === postId );
  return comment;
};

module.exports = { getCommentByPost };
