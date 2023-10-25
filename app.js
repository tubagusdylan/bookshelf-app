let books = [];

const bookContainerCompleted = document.getElementById("completed-books");
const bookContainerUncompleted = document.getElementById("uncompleted-books");
const title = document.getElementById("title-input");
const author = document.getElementById("author-input");
const year = document.getElementById("year-input");
const isCompleted = document.getElementById("book-completed");
const addBookForm = document.getElementById("form-input-buku");
let editMenu = false;
let currentId;

const searchBookForm = document.getElementById("form-cari-buku");
const searchTitleBook = document.getElementById("search-input");

const bookStorage = "BOOK_STORAGE";

window.onload = () => {
  if (!checkStorage()) {
    return;
  }

  if (localStorage.getItem(bookStorage) !== null) {
    showBooks();
  } else {
    localStorage.setItem(bookStorage, "");
  }
};

addBookForm.onsubmit = (e) => {
  e.preventDefault();

  if (editMenu) {
    const index = books.findIndex((book) => {
      return book.id === currentId;
    });

    books[index].title = title.value;
    books[index].author = author.value;
    books[index].year = year.value;
    books[index].isCompleted = isCompleted.checked;

    saveBooksOnStorage();
    showBooks();
    clearInputValue();
    document.getElementById("button-add").innerText = "Tambah buku ke rak";
    editMenu = false;
    return;
  }

  const newBook = {
    id: Date.now(),
    title: title.value,
    author: author.value,
    year: year.value,
    isCompleted: isCompleted.checked,
  };

  books.push(newBook);
  saveBooksOnStorage();
  showBooks();
  clearInputValue();
};

searchBookForm.onsubmit = (e) => {
  e.preventDefault();

  const searchText = searchTitleBook.value.toLowerCase();
  showBooks(searchText);
};

function showBooks(searchText) {
  clearInnerHTML();

  books = JSON.parse(localStorage.getItem(bookStorage));

  if (!searchText) {
    searchText = "";
  }

  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    if (book.title.toLowerCase().includes(searchText)) {
      addBook(book, i);
    }
  }
}

function clearInnerHTML() {
  bookContainerCompleted.innerHTML = "";
  bookContainerUncompleted.innerHTML = "";
}

function clearInputValue() {
  title.value = "";
  author.value = "";
  year.value = "";
  isCompleted.checked = false;
}

function checkStorage() {
  if (typeof Storage === undefined) {
    alert("Browser tidak mendukung storage");
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
  buttonEdited.onclick = () => {
    updateBook(index);
  };

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
      saveBooksOnStorage();
      showBooks();
    };

    bookCard.append(bookTitle, bookAuthor, bookYear, buttonCompleted, buttonEdited, buttonDeleted);
    bookContainerCompleted.appendChild(bookCard);
  } else {
    buttonCompleted.innerText = "Selesai";
    buttonCompleted.classList.add("btn", "button-completed");
    buttonCompleted.onclick = () => {
      books[index].isCompleted = true;
      saveBooksOnStorage();
      showBooks();
    };

    bookCard.append(bookTitle, bookAuthor, bookYear, buttonCompleted, buttonEdited, buttonDeleted);
    bookContainerUncompleted.appendChild(bookCard);
  }
}

function deleteBook(index) {
  if (editMenu) {
    return;
  }
  books.splice(index, 1);
  saveBooksOnStorage();
  showBooks();
}

function updateBook(index) {
  currentId = books[index].id;
  title.value = books[index].title;
  author.value = books[index].author;
  year.value = books[index].year;
  isCompleted.checked = books[index].isCompleted;
  editMenu = true;

  document.getElementById("button-add").innerText = "Update Buku";
}

function saveBooksOnStorage() {
  localStorage.setItem(bookStorage, JSON.stringify(books));
}
