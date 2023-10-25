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

  const newBook = {
    id: Date.now(),
    title: title.value,
    author: author.value,
    year: Number(year.value),
    isCompleted: isCompleted.checked,
  };

  books.push(newBook);
  showBooks();
};

function showBooks() {
  clearInnerHTML();

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    addBook(book, i);
  }
}

function clearInnerHTML() {
  bookContainerCompleted.innerHTML = "";
  bookContainerUncompleted.innerHTML = "";
}

function checkStorage() {
  if (typeof Storage === undefined) {
    return false;
  }

  return true;
}

function addBook(book, index) {
  const bookCard = document.createElement("div");
  const bookTitle = document.createElement("h3");
  const bookAuthor = document.createElement("h4");
  const bookYear = document.createElement("h5");
  const buttonCompleted = document.createElement("button");
  const buttonEdited = document.createElement("button");
  const buttonDeleted = document.createElement("button");

  bookCard.className = "book-card";

  bookTitle.innerText = book.title;
  bookAuthor.innerText = book.author;
  bookYear.innerText = book.year;

  buttonEdited.innerText = "Edit";
  buttonEdited.classList.add("btn", "button-edited");

  buttonDeleted.innerText = "Hapus";
  buttonDeleted.classList.add("btn", "button-deleted");
  buttonDeleted.onclick = () => {
    deleteBook(index);
  };

  if (book.isCompleted) {
    buttonCompleted.innerText = "Belum selesai";
    buttonCompleted.classList.add("btn", "button-completed");
    buttonCompleted.onclick = () => {
      books[index].isCompleted = false;
      showBooks();
    };

    bookCard.append(bookTitle, bookAuthor, bookYear, buttonCompleted, buttonEdited, buttonDeleted);

    bookContainerCompleted.appendChild(bookCard);
  } else {
    buttonCompleted.innerText = "Selesai";
    buttonCompleted.classList.add("btn", "button-completed");
    buttonCompleted.onclick = () => {
      books[index].isCompleted = true;
      showBooks();
    };

    bookCard.append(bookTitle, bookAuthor, bookYear, buttonCompleted, buttonEdited, buttonDeleted);
    bookContainerUncompleted.appendChild(bookCard);
  }
}

function deleteBook(index) {
  books.splice(index, 1);
  showBooks();
}
