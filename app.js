let books = [];

const bookContainerCompleted = document.getElementById("completed-books");
const bookContainerUncompleted = document.getElementById("uncompleted-books");
const title = document.getElementById("title-input");
const author = document.getElementById("author-input");
const year = document.getElementById("year-input");
const isCompleted = document.getElementById("book-completed");
const addBookForm = document.getElementById("form-input-buku");

addBookForm.onsubmit = (e) => {
  e.preventDefault();
  showBooks();
  console.log(books);
};

function showBooks() {
  addBook();
}

function checkStorage() {
  if (typeof Storage === undefined) {
    return false;
  }

  return true;
}

function addBook(index) {
  const newBook = {
    id: Date.now(),
    title: title.value,
    author: author.value,
    year: Number(year.value),
    isCompleted: isCompleted.checked,
  };

  const bookCard = document.createElement("div");
  const bookTitle = document.createElement("h3");
  const bookAuthor = document.createElement("h4");
  const bookYear = document.createElement("h5");
  const buttonCompleted = document.createElement("button");
  const buttonEdited = document.createElement("button");
  const buttonDeleted = document.createElement("button");

  bookCard.className = "book-card";

  bookTitle.innerText = newBook.title;
  bookAuthor.innerText = newBook.author;
  bookYear.innerText = newBook.year;

  buttonCompleted.innerText = "Selesai";
  buttonCompleted.classList.add("btn", "button-completed");

  buttonEdited.innerText = "Edit";
  buttonEdited.classList.add("btn", "button-edited");

  buttonDeleted.innerText = "Hapus";
  buttonDeleted.classList.add("btn", "button-deleted");

  bookCard.append(bookTitle, bookAuthor, bookYear, buttonCompleted, buttonEdited, buttonDeleted);

  if (newBook.isCompleted) {
    bookContainerCompleted.appendChild(bookCard);
  } else {
    bookContainerUncompleted.appendChild(bookCard);
  }

  books.push(newBook);
}
