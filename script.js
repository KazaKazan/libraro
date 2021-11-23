const addButton = document.getElementById("addButton")
const acceptButton = document.getElementById("acceptButton")
const cancelButton = document.getElementById("cancelButton")
const addPrompt = document.getElementById("addPrompt")
const titleField = document.getElementById("titleField")
const authorField = document.getElementById("authorField")
const pageField = document.getElementById("numberField")
const statusField = document.getElementById("statusField")
const delButton = document.getElementById("delButton")
const selectAll = document.getElementById("selectAll")
const markRead = document.getElementById("markRead")
const markUnread = document.getElementById("markUnread")

let library = [];
let selected = [];

function Book(title,author,pages,read,ID){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.ID = ID;
}

function selAll(self) {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(element => {
        if(element != self && element != statusField){
            element.checked = self.checked;
            selectParent(element)
        }
    });
};

function selectParent(element) {
    const parent = element.parentNode
    const index = selected.indexOf(parent);

    if (element.checked != true){
        if (index > -1) {
            selected.splice(index, 1);
        }
    }
    else {
        if (index === -1) {
            selected.push(parent)
        }
    }

    if (selected.length === 0) {
        delButton.classList.add("hiddenAnim");
        markRead.classList.add("hiddenAnim");
        markUnread.classList.add("hiddenAnim");
    }
    else {
        delButton.classList.remove("hiddenAnim");
        markRead.classList.remove("hiddenAnim");
        markUnread.classList.remove("hiddenAnim");
    }
};

function clearFields () {
    titleField.value = null;
    authorField.value = null;
    pageField.value = null;
    statusField.checked = false;
}

function displayEmpty () {
    const emptyContainer = document.getElementById("emptyContainer");

    if (library.length === 0) {
        emptyContainer.classList.remove("hiddenAnim")
    }
    else {
        emptyContainer.classList.add("hiddenAnim")
    }
};


function displayBook (book) {
    const bookShelf = document.getElementById("content");

    const newBook = document.createElement("div");
    newBook.classList.add("book");

    const selector = document.createElement("input")
    selector.setAttribute("type","checkbox")
    selector.setAttribute("width","14px")
    selector.setAttribute("grid-area","sel")
    selector.classList.add("start")
    selector.onclick = () => selectParent(selector)
    newBook.appendChild(selector)

    const bookName = document.createElement("p");
    bookName.textContent = book.title;
    bookName.classList.add("start")
    bookName.setAttribute("grid-area","title")
    newBook.appendChild(bookName)

    const author = document.createElement("p");
    author.setAttribute("grid-area","author")
    author.textContent = book.author;
    newBook.appendChild(author)

    const numberCont = document.createElement("div")
    numberCont.classList.add("flexJustify")
    const pageNumber = document.createElement("p");
    pageNumber.textContent = book.pages;
    numberCont.appendChild(pageNumber)
    newBook.appendChild(numberCont)

    const status = document.createElement("p");
    if(book.read === true){
        status.textContent = "Read";
    }
    else{
        status.textContent = "Not read";
    }
    status.classList.add("end")
    status.setAttribute("id","statusid" + book.ID)
    status.setAttribute("grid-area","status")
    newBook.appendChild(status)

    newBook.setAttribute("id","bookid" + book.ID)

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
    let ID = Math.random().toString().substring(2);

    let dupe = library.find(x => x.ID === ID);
    if (dupe != undefined) {
        while(dupe != undefined){
            ID = Math.random().toString().substring(2);
            dupe = library.find(x => x.ID === ID);
        }
    }

    const newBook = new Book(titleField.value,authorField.value,pageField.value,statusField.value,ID);
    
    library.push(newBook)
    displayBook(newBook)
};

function deleteBooks(){
    selected.forEach(element => {
        const parent = element.parentNode
        const bookID = element.id.substring(6)
        const libIndex = library.findIndex(x => x.ID === bookID)
        library.splice(libIndex,1)
        parent.removeChild(element)
    });
    
    if (selectAll.checked) {
        selectAll.checked = false
    }

    selected = []

    displayEmpty()
};

function markBooks(status){
    selected.forEach(element => {
        const parent = element.parentNode
        const bookID = element.id.substring(6)
        const libIndex = library.findIndex(x => x.ID === bookID)
        library[libIndex].read = status
        const statusID = "statusid" + bookID
        const statusField = document.getElementById(statusID)
        if(status === true){
            statusField.textContent = "Read"
        }
        else {
            statusField.textContent = "Not read"
        }

    });    
}

function saveData () {
    window.localStorage.setItem("library",JSON.stringify(library));
}

function loadData () {
    library = JSON.parse(window.localStorage.getItem("library"));
}

markRead.onclick = () => {
    markBooks(true)
    saveData()
};

markUnread.onclick = () => {
    markBooks(false)
    saveData()
};

addButton.onclick = () => {
    addPrompt.classList.remove("hidden")
    clearFields()
};

delButton.onclick = () => {
    deleteBooks()
    delButton.classList.add("hiddenAnim")
    markRead.classList.add("hiddenAnim")
    markUnread.classList.add("hiddenAnim")
    saveData()
}

acceptButton.onclick = () => {
    addBook()
    addPrompt.classList.add("hidden")
    saveData()
};

cancelButton.onclick = () => {
    addPrompt.classList.add("hidden")
};

selectAll.onclick = () => selAll(selectAll);


window.onload = function () {
    selectAll.checked = false
    loadData()
    if (library === null){
        library = []
    };
    displayLibrary()
}