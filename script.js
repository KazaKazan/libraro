const library = [];

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const bookA = new Book("Book A","Author A",100,false);
const bookB = new Book("Book B","Author B",250,false);
const bookC = new Book("Book C","Author C",100,true);

library.push(bookA)
library.push(bookB)
library.push(bookC)

function displayBooks () {
    const bookShelf = document.getElementById("content");
    const emptyContainer = document.getElementById("emptyContainer");

    if (library.length > 0) {
        emptyContainer.classList.add("hidden");

        library.forEach(element => {
            const newBook = document.createElement("div");
            newBook.classList.add("book");
            const selector = document.createElement("input")
            selector.setAttribute("type","checkbox")
            newBook.appendChild(selector)
            const bookName = document.createElement("p");
            bookName.textContent = element.title;
            bookName.classList.add("start")
            newBook.appendChild(bookName)
            bookShelf.appendChild(newBook)
        });
    }

    else{
        emptyContainer.classList.remove("hidden");
    }

    }

window.onload = displayBooks()