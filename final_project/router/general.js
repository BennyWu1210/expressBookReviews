const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.use(express.json());
public_users.post("/register", (req,res) => {
  
  const { username, password } = req.body;
    // Basic input validation
  console.log(req.body);
  if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
  }

  if (isValid(username, password)) return res.status(409).json({ message: "Username is already taken." });

  // Add the new user to the users object
  users.push({username: username, password: password});

  return res.status(201).json({ message: "User registered successfully." });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) return res.status(200).json(book);
  return res.status(404).json({message: "book not found"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const result = Object.keys(books)
  .filter(key => books[key].author === author) // condition to filter
  .reduce((obj, key) => {
      obj[key] = books[key];
      return obj;
  }, {});

  if (result) return res.status(200).json(result);
  return res.status(404).json({message: "author not found"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const result = Object.keys(books)
  .filter(key => books[key].title === title) // condition to filter
  .reduce((obj, key) => {
      obj[key] = books[key];
      return obj;
  }, {});

  if (result) return res.status(200).json(result);
  return res.status(404).json({message: "title not found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) return res.status(200).json(book.reviews);
  return res.status(404).json({message: "book not found"});
});

module.exports.general = public_users;
