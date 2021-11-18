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

for(let i = 0; i < 10; i++){
    library.push(bookA)
    library.push(bookB)
    library.push(bookC)
}


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
            selector.setAttribute("width","14px")
            newBook.appendChild(selector)

            const bookName = document.createElement("p");
            bookName.textContent = element.title;
            bookName.classList.add("start")
            newBook.appendChild(bookName)

            const author = document.createElement("p");
            author.textContent = element.author;
            newBook.appendChild(author)

            const pageNumber = document.createElement("p");
            pageNumber.textContent = element.pages;
            pageNumber.setAttribute("justify-self","center")
            newBook.appendChild(pageNumber)

            const status = document.createElement("p");
            if(element.status){
                status.textContent = "Read";
            }
            else{
                status.textContent = "Not read";
            }
            status.classList.add("end")
            newBook.appendChild(status)

            bookShelf.appendChild(newBook)
        });
    }

    else{
        emptyContainer.classList.remove("hidden");
    }

    }

window.onload = displayBooks()