const apiUrl = "http://localhost:3000/books";

// Fetch the data
async function fetchData() {
    try {
        const response = await fetch(apiUrl); // Await the fetch call
        if (!response.ok) {
            throw new Error("Network status is not ok");
        }
        const data = await response.json(); // Await the JSON parsing
        populateTable(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to populate the table with data
function populateTable(data) {
    const tableBody = document.querySelector("#booksTable tbody");
    tableBody.innerHTML = ""; // Clear any existing rows

    data.forEach(book => { // loop on all objects in that array
        const row = document.createElement("tr");

        // Add book details to the row
        console.log(book)
        console.log(Object.values(book))

        Object.values(book).forEach(value => { //access each property inside the specific object (Title,author,..)
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        // Create Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            window.location.href = `Edit.html?id=${book.id}`;
        });

        // Create Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", async () => {
            try {
                const response = await fetch(`${apiUrl}/${book.id}`, {
                    method: "DELETE"
                });
                if (response.ok) {
                    // Remove the row from the table
                    row.remove();
                } else {
                    throw new Error("Failed to delete book");
                }
            } catch (error) {
                console.error("Error deleting book:", error);
            }
        });

        // Create cell for buttons and append buttons
        const buttonCell = document.createElement("td");
        buttonCell.appendChild(editButton);
        buttonCell.appendChild(deleteButton);
        row.appendChild(buttonCell);

        tableBody.appendChild(row);
    });
}

fetchData();
