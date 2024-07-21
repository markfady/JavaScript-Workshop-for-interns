const apiUrl = "http://localhost:3000/books";

// Cache form elements
const bookIdInput = document.getElementById("bookId");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const genreInput = document.getElementById("genre");
const priceInput = document.getElementById("price");
const inStockInput = document.getElementById("inStock");

// Function to get the book details from the server
async function getBookDetails(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) {
            throw new Error("Network status is not ok");
        }
        const book = await response.json();
        populateForm(book);
    } catch (error) {
        console.error("Error fetching book details:", error);
    }
}

// Function to populate the form with book data
function populateForm(book) {
    bookIdInput.value = book.id;
    titleInput.value = book.title;
    authorInput.value = book.author;
    genreInput.value = book.genre;
    priceInput.value = book.price;
    inStockInput.checked = book.inStock;
}

// Function to handle form submission
async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const id = bookIdInput.value;
    const updatedBook = {
        id: id,
        title: titleInput.value,
        author: authorInput.value,
        genre: genreInput.value,
        price: parseFloat(priceInput.value),
        inStock: inStockInput.checked // Get checkbox state
    };

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedBook)
        });

        if (response.ok) {
            window.location.href = "index.html"; // Redirect back to the main page
            alert("Book updated successfully!");
        } else {
            throw new Error("Failed to update book");
        }
    } catch (error) {
        console.error("Error updating book:", error);
    }
}

// Get the book ID from the URL and fetch the book details
function editBook() {
   
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get("id");

    if (bookId) {
        getBookDetails(bookId);
    } else {
        alert("No book ID provided.");
        window.location.href = "index.html";
    }

    const form = document.getElementById("editForm");
    form.addEventListener("submit", handleFormSubmit);
}

editBook();
