    document.getElementById("addBookForm").addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Gather form data 
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const genre = document.getElementById("genre").value;
        const price = document.getElementById("price").value;
        const inStock = document.getElementById("inStock").checked;

        let nextId; // Declare nextId variable

        // Fetch existing books to determine the next ID
        try {
            const response = await fetch("http://localhost:3000/books");
            if (!response.ok) {
                throw new Error("Failed to fetch existing books");
            }

            const books = await response.json();
            //Get the highest ID from the books array then increment it by 1
            const maxId = books.reduce((accumulator, book) => Math.max(accumulator, book.id), 0);
            nextId = (maxId + 1).toString(); // Convert the next ID to a string
        } catch (error) {
            console.log(error);
            return; // Exit the function if an error occurs
        }

        const newBook = {
            id: nextId, // Use the calculated ID
            title: title,
            author: author,
            genre: genre,
            price: parseFloat(price),
            inStock: inStock
        };

        // Send a POST request to the server
        try {
            const response = await fetch("http://localhost:3000/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBook)
            });

            if (!response.ok) {
                throw new Error("Failed to add book");
            }

            // Redirect to the main page after successful submission
            window.location.href = "index.html";
        } catch (error) {
            console.error("Error adding book:", error);
        }
    });
