// index.js

const express = require("express");
const app = express();
const port = 3100;
const postRoutes = require("./routes/post.route");
const userRoutes = require("./routes/user.route");
const commentRoutes = require("./routes/comments.route");
require('dotenv').config()

// Middleware to parse JSON bodies
app.use(express.json());

// Use post routes
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comment", commentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


// http://192.168.10.202:3000/api/posts/3
// http://192.168.10.202:3000/api/user/login
// http://192.168.10.202:3000/api/posts
