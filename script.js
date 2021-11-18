const library = [];

function Book(title,author,pages,read,ID){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.ID = ID;
}

const bookA = new Book("Book A","Author A",100,false,0);
const bookB = new Book("Book B","Author B",250,false,1);
const bookC = new Book("Book C","Author C",100,true,2);

//for(let i = 0; i < 10; i++){
//    library.push(bookA)
//    library.push(bookB)
//    library.push(bookC)
//}


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

            const numberCont = document.createElement("div")
            numberCont.classList.add("flexJustify")
            const pageNumber = document.createElement("p");
            pageNumber.textContent = element.pages;
            numberCont.appendChild(pageNumber)
            newBook.appendChild(numberCont)

            const status = document.createElement("p");
            if(element.read){
                status.textContent = "Read";
            }
            else{
                status.textContent = "Not read";
            }
            status.classList.add("end")
            newBook.appendChild(status)

            newBook.setAttribute("id","bookid" + toString(element.ID))

            bookShelf.appendChild(newBook)
        });
    }

    else{
        emptyContainer.classList.remove("hidden");
    }

    }

window.onload = displayBooks()