const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  return users.filter(user => user.username === username).length !== 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
  return users.filter(user => user.username === username && user.password === password).length !== 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const {username, password} = req.body;

  if (authenticatedUser(username, password)) {
    // Create a JWT token
    const token = jwt.sign({ username: username }, jwtSecretKey, { expiresIn: '1h' });
    return res.status(200).json({ token: token });
  } else {
    // Invalid username/password
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
