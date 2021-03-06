//event listeners
document.getElementById("addBook").onclick = addBookToLibrary;

//some consts
const bookContainer = document.getElementById("bookContainer");

//init array
var library = [];

//reset form
//better than the recursive loop on
function clearForm() {
  const inputs = document.querySelectorAll(
    "#bookTitle, #bookAuthor, #numberOfPages, #currentPage, #isRead"
  );

  inputs.forEach((input) => {
    input.value = "";
  });
}

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
    console.log(this.title + " created");
  }
}

//Add book
//this function pushes a book to the array
function addBookToLibrary() {
  event.preventDefault();
  const title = document.getElementById("bookTitle").value;
  if (searchForBook(title) === true && title !== "") {
    const author = document.getElementById("bookAuthor").value;
    const numberOfPages = document.getElementById("numberOfPages").value;
    const currentPage = document.getElementById("currentPage").value;
    const read = document.querySelector("#isRead").checked;

    newBook = new Book(title, author, numberOfPages, currentPage, read);
    library.push(newBook);
    console.log(title + " pushed to library");
    clearForm();
    renderLibrary();
    saveData();
  }
}

//search for book
// TODO: search for book + author, two titles could be the same
//probably re-write this just to return the array position?
function searchForBook(title) {
  this.title = title;
  book = library.find(
    (book) => book.title.toUpperCase() == title.toUpperCase()
  );
  if (book) {
    console.log(book);
    clearForm();
    console.log(book.title + " found");
    return false;
  } else {
    console.log("Book not found");
    return true;
  }
}

//simple toggle function for boolean is read / is not read
function toggleRead(book) {
  book.read = !book.read;
}

//render book element
function renderBook(book) {
  //Create new DOM for book
  const bookBackground = document.createElement("div");
  bookBackground.id = "book-render";
  //Get book Information
  const title = document.createTextNode("Title: " + book.title);
  const author = document.createTextNode("Author: " + book.author);
  const numberOfPages = document.createTextNode(book.numberOfPages + " pages.");
  const currentPage = document.createTextNode(
    "Current page: " + book.currentPage
  );
  let readButton = document.createElement("button");
  readButton.id = "readButton";
  let deleteButton = document.createElement("button");
  deleteButton.id = "deleteButton";

  //Set book info to DOM
  bookBackground.appendChild(title);
  bookBackground.appendChild(document.createElement("br"));
  bookBackground.appendChild(author);
  bookBackground.appendChild(document.createElement("br"));
  bookBackground.appendChild(numberOfPages);
  bookBackground.appendChild(document.createElement("br"));
  bookBackground.appendChild(currentPage);
  bookBackground.appendChild(document.createElement("br"));
  bookBackground.appendChild(readButton);
  bookBackground.appendChild(document.createElement("br"));
  bookBackground.appendChild(deleteButton);

  //render is read button
  if (book.read) {
    readButton.classList.add("greenRead");
  } else {
    readButton.classList.add("redRead");
  }

  //DELETE function
  deleteButton.addEventListener("click", () => {
    library.splice(library.indexOf(book), 1);
    renderLibrary();
    saveData();
  });

  //TOGGLE read function
  readButton.addEventListener("click", () => {
    book.read = !book.read;
    renderLibrary();
    saveData();
  });

  //Find insertion point div in book container html and add book
  document.getElementById("bookContainer").appendChild(bookBackground);
  console.log(book.title + " rendered");
}

//render library
//calls clearRender to remove old DOMs
//calls renderBook command for each book object in library
function renderLibrary() {
  clearRender();
  library.forEach((element) => renderBook(element));
}

//remove renders via a recursive loop
function clearRender() {
  var bookRender = document.getElementById("book-render");
  if (bookRender) {
    bookRender.parentNode.removeChild(bookRender);
    clearRender();
    console.count(" render deleted");
  }
}

//save local data function
function saveData() {
  localStorage.setItem(`library`, JSON.stringify(library));
}

//pulls library from local data
function loadLibrary() {
  if (!localStorage.library) {
    renderLibrary();
  } else {
    let books = localStorage.getItem("library");
    books = JSON.parse(books);
    library = books;
    renderLibrary();
  }
}

loadLibrary();

/*
//testing
var book1 = new Book("Book1", "Jim", 400, 12);
var book2 = new Book("Book2", "Dan", 300);
var book3 = new Book("Book3", "Sven", 500, 0);

library.push(book1);
library.push(book2);
library.push(book3);


//delete book object via title property: string input (unused)
function deleteBook(title) {
  this.title = title;
  this.library = this.library.filter((book) => book.title !== title);
  console.log(book.title + " deleted");
}

*/
