//event listeners
document.getElementById("bookInfoForm").onsubmit = addBookToLibrary;
document.getElementById("renderButton").onclick = renderLibrary;

//some consts
const bookContainer = document.getElementById("bookContainer");

//init array
var library = [];

//create a book
class Book {
  constructor(
    title = "Undefined",
    author = "Undefined",
    numberOfPages = 0,
    currentPage = 0,
    read = false
  ) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.currentPage = currentPage;
    this.read = read;
  }
}

//this function pushes a book to the array
function addBookToLibrary() {
  event.preventDefault();
  const title = document.getElementById("bookTitle").value;
  const author = document.getElementById("bookAuthor").value;
  const numberOfPages = document.getElementById("numberOfPages").value;
  const currentPage = document.getElementById("currentPage").value;
  const read = document.querySelector("#isRead").checked;

  newBook = new Book(title, author, numberOfPages, currentPage, read);
  library.push(newBook);

  console.log(newBook);
  console.log(library);
}

//delete book object via title property: string input
function deleteBook(title) {
  this.title = title;
  this.library = this.library.filter((book) => book.title !== title);
}

//search for book
function searchForBook(title) {
  this.title = title;
  book = library.find(
    (book) => book.title.toUpperCase() == title.toUpperCase()
  );
  if (book) {
    console.log(book);
    return library.indexOf(book);
  } else {
    console.log("Book not found");
  }
}

//render book element
function renderBook(book) {
  //Create new DOM for book
  const bookBackground = document.createElement("div");
  bookBackground.id = "book-render";
  //Get book Information
  const title = document.createTextNode(book.title);
  const author = document.createTextNode(book.author);
  const numberOfPages = document.createTextNode(book.numberOfPages);
  const currentPage = document.createTextNode(book.currentPage);
  // const read = document.createTextNode(book.read.toString());
  //Set book info to DOM
  bookBackground.appendChild(title);
  bookBackground.appendChild(document.createElement("br"));
  bookBackground.appendChild(author);
  bookBackground.appendChild(document.createElement("br"));
  bookBackground.appendChild(numberOfPages);
  bookBackground.appendChild(document.createElement("br"));
  bookBackground.appendChild(currentPage);
  bookBackground.appendChild(document.createElement("br"));
  // bookBackground.appendChild(read);

  //Find insertion point div in book container and add book
  document.getElementById("bookContainer").appendChild(bookBackground);
}

//render library

//clears any existing DOMs
//calls renderBook command for each book object in library
function renderLibrary() {
  library.forEach((element) => renderBook(element));
}

//remove renders
function clearLastRender() {
  var bookRender = document.getElementById("book-render");
  bookRender.remove();
}

function clearAllRender() {
  library.forEach((element) => clearLastRender());
}

/*
//testing
var book1 = new Book("Book1", "Jim", 400, 12);
var book2 = new Book("Book2", "Dan", 300);
var book3 = new Book("Book3", "Sven", 500, 0);

library.push(book1);
library.push(book2);
library.push(book3);

*/
