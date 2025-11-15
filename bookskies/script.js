/*//script for the popup form
var popupoverlay=document.querySelector(".popup-overlay")
var popupbox=document.querySelector(".popup-box")
var addpopupbutton=document.getElementById("add-popup-button")
//showing the popup on clicking the add button
addpopupbutton.addEventListener("click",function(){
    popupoverlay.style.display="block"
    popupbox.style.display="block"
})
//preventing the default action of the cancel button
var cancelpopup=document.getElementById("cancel-popup")
cancelpopup.addEventListener("click",function(event){
    event.preventDefault()

//hiding the popup on clicking the overlay
    popupoverlay.style.display="none"
    popupbox.style.display="none"
})

//select content & add -book,title,author,description

var container = document.querySelector(".container")
var addbook = document.getElementById("add-book")
var booktitle = document.getElementById("book-title-input")
var bookauthor = document.getElementById("book-author-input")
var bookdescription = document.getElementById("book-description-input")


addbook.addEventListener("click",function(event){
    event.preventDefault()
    var div= document.createElement("div")
    div.setAttribute("class","book-container")
    //main${}
    div.innerHTML=`<h2>${booktitle.value}</h2>
            <h5>${bookauthor.value}</h5>
            <p>${bookdescription.value}</p>
           <button onclick="deletebook(event)">Remove</button>`
    container.append(div)
    popupoverlay.style.display="none"
    popupbox.style.display="none"
})

function deletebook(event)
{
    event.target.parentElement.remove()
}*/
var popupoverlay = document.querySelector(".popup-overlay");
var popupbox = document.querySelector(".popup-box");
var addpopupbutton = document.getElementById("add-popup-button");

// Show popup when clicking + button
addpopupbutton.addEventListener("click", function () {
    popupoverlay.style.display = "block";
    popupbox.style.display = "block";
});

var cancelpopup = document.getElementById("cancel-popup");
cancelpopup.addEventListener("click", function (event) {
    event.preventDefault();
    popupoverlay.style.display = "none";
    popupbox.style.display = "none";
});

// Form elements
var container = document.querySelector(".container");
var addbook = document.getElementById("add-book");
var booktitle = document.getElementById("book-title-input");
var bookauthor = document.getElementById("book-author-input");
var bookdescription = document.getElementById("book-description-input");


// Load books from localStorage on page load
window.onload = function () {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.forEach(book => {
        addBookToUI(book.title, book.author, book.description);
    });
};


// Add new book
addbook.addEventListener("click", function (event) {
    event.preventDefault();

    let title = booktitle.value;
    let author = bookauthor.value;
    let description = bookdescription.value;

    // Add to UI
    addBookToUI(title, author, description);

    // Save to localStorage
    saveBookToLocal(title, author, description);

    // Close popup
    popupoverlay.style.display = "none";
    popupbox.style.display = "none";

    // Clear inputs
    booktitle.value = "";
    bookauthor.value = "";
    bookdescription.value = "";
});


// Add book card to UI
function addBookToUI(title, author, description) {
    var div = document.createElement("div");
    div.setAttribute("class", "book-container");

    div.innerHTML = `
        <h2>${title}</h2>
        <h5>${author}</h5>
        <p>${description}</p>
        <button onclick="deletebook(event)">Remove</button>
    `;

    container.append(div);
}


// Save book to localStorage
function saveBookToLocal(title, author, description) {
    let books = JSON.parse(localStorage.getItem("books")) || [];

    books.push({ title, author, description });

    localStorage.setItem("books", JSON.stringify(books));
}


// Delete book card + update localStorage
function deletebook(event) {
    let bookDiv = event.target.parentElement;

    let title = bookDiv.querySelector("h2").innerText;
    let author = bookDiv.querySelector("h5").innerText;

    // Remove from UI
    bookDiv.remove();

    // Remove from localStorage
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let updatedBooks = books.filter(book => !(book.title === title && book.author === author));

    localStorage.setItem("books", JSON.stringify(updatedBooks));
}
