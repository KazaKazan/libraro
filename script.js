const addButton = document.getElementById("addButton")
const acceptButton = document.getElementById("acceptButton")
const cancelButton = document.getElementById("cancelButton")
const addPrompt = document.getElementById("addPrompt")
const titleField = document.getElementById("titleField")
const authorField = document.getElementById("authorField")
const pageField = document.getElementById("numberField")
const statusField = document.getElementById("statusField")

const library = [];

function Book(title,author,pages,read,ID){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.ID = ID;
}

function clearFields () {
    titleField.value = null;
    authorField.value = null;
    pageField.value = null;
    statusField.balue = false;
}

function displayEmpty () {
    const emptyContainer = document.getElementById("emptyContainer");

    if (library.length === 0) {
        emptyContainer.classList.remove("hidden")
    }
    else {
        emptyContainer.classList.add("hidden")
    }
};


function displayBook (book) {
    library.push(book);

    const bookShelf = document.getElementById("content");

    const newBook = document.createElement("div");
    newBook.classList.add("book");

    const selector = document.createElement("input")
    selector.setAttribute("type","checkbox")
    selector.setAttribute("width","14px")
    newBook.appendChild(selector)

    const bookName = document.createElement("p");
    bookName.textContent = book.title;
    bookName.classList.add("start")
    newBook.appendChild(bookName)

    const author = document.createElement("p");
    author.textContent = book.author;
    newBook.appendChild(author)

    const numberCont = document.createElement("div")
    numberCont.classList.add("flexJustify")
    const pageNumber = document.createElement("p");
    pageNumber.textContent = book.pages;
    numberCont.appendChild(pageNumber)
    newBook.appendChild(numberCont)

    const status = document.createElement("p");
    if(book.read){
        status.textContent = "Read";
    }
    else{
        status.textContent = "Not read";
    }
    status.classList.add("end")
    newBook.appendChild(status)

    newBook.setAttribute("id","bookid" + toString(book.ID))

    bookShelf.appendChild(newBook)
    displayEmpty()
}

function displayLibrary () {

    if (library.length > 0) {
        emptyContainer.classList.add("hidden");

        library.forEach(element => {
            displayBook(element)
        });
    }
};

function addBook () {
    const newBook = new Book(titleField.value,authorField.value,pageField.value,statusField.value,library.length);
    
    library.push(newBook)
    displayBook(newBook)
};

addButton.onclick = () => {
    addPrompt.classList.remove("hidden")
    clearFields()
};

acceptButton.onclick = () => {
    addBook()
    addPrompt.classList.add("hidden")
};

cancelButton.onclick = () => {
    addPrompt.classList.add("hidden")
};

window.onload = displayLibrary()