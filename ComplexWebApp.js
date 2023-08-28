/*
Filename: ComplexWebApp.js

This code demonstrates a complex web application that utilizes various advanced JavaScript concepts and libraries. The application is a social media platform with features like user authentication, posting content, liking posts, and following users.

*/

// Importing necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Initializing express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connecting to MongoDB database
mongoose.connect('mongodb://localhost/social_media_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Defining database schemas
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

const postSchema = new mongoose.Schema({
  content: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// User registration API endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hashing the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Creating a new user in the database
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// User login API endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Searching for the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Comparing the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Creating and returning a JSON web token for authentication
    const token = jwt.sign({ userId: user._id }, 'secretKey');
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Authenticated route - Creating a new post
app.post('/posts', authenticateToken, async (req, res) => {
  const { content } = req.body;
  try {
    // Creating a new post in the database
    const newPost = new Post({ content });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Authenticated route - Liking a post
app.post('/posts/:id/like', authenticateToken, async (req, res) => {
  const postId = req.params.id;

  try {
    // Finding the post and updating its likes
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    post.likes.push(req.user._id);
    await post.save();

    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Authenticated route - Getting user's feed
app.get('/feed', authenticateToken, async (req, res) => {
  try {
    // Finding all the posts liked by the user
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(401).json({ message: 'Invalid user' });
      return;
    }
    const likedPosts = await Post.find({ _id: { $in: user.likes } });

    // Fetching the latest posts from other users
    const otherPosts = await Post.find()
      .where('_id')
      .nin(user.likes)
      .sort({ _id: -1 })
      .limit(10);

    res.status(200).json({ likedPosts, otherPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Middleware for authenticating requests using JSON web token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    req.user = user;
    next();
  });
}

// Starting the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
