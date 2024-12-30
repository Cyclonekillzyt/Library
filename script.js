/*function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        let readState = (this.read) ? "read" : "Not yet";
        console.log( `${this.title} by ${this.author}, ${this.pages} pages, ${readState}` );
    }
}

let book1 = new Book('To Kill a Mockingbird', 'Harper Lee', 295, true);
let book2 = new Book('1984', 'George Orwell', 328, false);

Object.getPrototypeOf(book1) === Book.prototype; // returns true
Object.getPrototypeOf(book2) === Book.prototype; // returns true


book1.info();

function Person(name) {
    this.name = name;
  }

  Person.prototype.sayName = function() {
    console.log(`Hello, I'm ${this.name}!`);
  };

  function Player(name, marker) {
    this.name = name;
    this.marker = marker;
  }

  Player.prototype.getMarker = function() {
    console.log(`My marker is '${this.marker}'`);
  };

  Object.getPrototypeOf(Player.prototype); // returns Object.prototype

  // Now make `Player` objects inherit from `Person`
  Object.setPrototypeOf(Player.prototype, Person.prototype);
  Object.getPrototypeOf(Player.prototype); // returns Person.prototype

  const player1 = new Player('steve', 'X');
  const player2 = new Player('also steve', 'O');

  player1.sayName(); // Hello, I'm steve!
  player2.sayName(); // Hello, I'm also steve!

  player1.getMarker(); // My marker is 'X'
  player2.getMarker(); // My marker is 'O'
  */

  const display = document.getElementById("display");
  const myLibrary = [];
  const form = document.getElementById("form");
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const read = document.getElementById("read");
  const addScreen = document.getElementById("main");
  const addPage = document.getElementById("addPage");
  const exitBtn = document.getElementById("exitBtn");
  
  let editIndex = null; // To track the index of the book being edited
  
  function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function info() {
      let readState = this.read ? "read" : "Not yet";
      return `${this.title} by ${this.author}, ${this.pages} pages, ${readState}`;
    };
  }
  
  function renderLibrary() {
    display.innerHTML = ""; // Clear existing content
    myLibrary.forEach((book, index) => {
      const card = document.createElement("div");
      const buttons = document.createElement("div");
      const edit = document.createElement("button");
      const deleteBtn = document.createElement("button");
  
      card.className = "card";
      buttons.className = "buttons";
      deleteBtn.className = "btn";
      edit.className = "btn";
  
      deleteBtn.innerHTML = "Delete";
      edit.innerHTML = "Edit";
      card.innerHTML = book.info();
  
      // Append buttons and card
      display.appendChild(card);
      card.appendChild(buttons);
      buttons.appendChild(edit);
      buttons.appendChild(deleteBtn);
  
      // Event listener for delete
      deleteBtn.addEventListener("click", () => {
        myLibrary.splice(index, 1); // Remove the book
        renderLibrary(); // Re-render library
      });
  
      // Event listener for edit
      edit.addEventListener("click", () => {
        editIndex = index; // Track the index of the book being edited
        addScreen.style.display = "block";
        title.value = book.title;
        author.value = book.author;
        pages.value = book.pages;
        read.value = book.read;
      });
    });
  }
  
  // Form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const newBook = new Book(title.value, author.value, pages.value, read.checked);
  
    if (editIndex !== null) {
      // Update existing book
      myLibrary[editIndex] = newBook;
      editIndex = null; // Reset edit index
    } else {
      // Add new book
      myLibrary.push(newBook);
    }
  
    // Clear form fields
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
  
    // Hide form and re-render library
    addScreen.style.display = "none";
    renderLibrary();
  });
  
  // Show form to add book
  addPage.addEventListener("click", () => {
    addScreen.style.display = "block";
  });
  
  // Hide form
  exitBtn.addEventListener("click", () => {
    addScreen.style.display = "none";
  });
  



