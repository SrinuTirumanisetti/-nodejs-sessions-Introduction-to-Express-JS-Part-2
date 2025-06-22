const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();

const dbPath = path.join(__dirname, "goodreads.db");
let db = null;

const InitializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    console.log("Database connected Succesfully");
    app.listen(3000, () => {
      console.log("server is running on http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

InitializeDBAndServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    select * from book order By book_id ;`;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
