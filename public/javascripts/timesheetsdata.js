document.addEventListener('DOMContentLoaded', function() {
    // Fetch the timesheets data from the server
    fetch('/timesheets/listing')
        .then(response => {
            if (!response.ok) {
                // Handle any errors that occurred during the fetch
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // Parse the response as JSON
            return response.json();
        })
        .then(apiJsonData => {
            // The parsed JSON data is now available as `apiJsonData`
            console.log(apiJsonData); // Log it to the console for debugging
            // Pass the data to a function to render it in a table
            renderDataInTheTable(apiJsonData);
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch or JSON parsing
            console.error('Error fetching timesheets:', error);
        });

    // Function to render the data in an HTML table
    function renderDataInTheTable(todos) {
        // Get the table body element
        const mytable = document.getElementById("timesheetTable").getElementsByTagName('tbody')[0];
        // Clear any existing rows
        mytable.innerHTML = '';
        // Iterate over the array of timesheet data
        todos.forEach(todo => {
            // Create a new table row element
            let newRow = document.createElement("tr");
            // Iterate over each value in the timesheet object
            Object.values(todo).forEach((value) => {
                // Create a new table cell element
                let cell = document.createElement("td");
                // Set the cell's text content to the current value
                cell.innerText = value;
                // Append the cell to the new row
                newRow.appendChild(cell);
            });
            // Append the new row to the table body
            mytable.appendChild(newRow);
        });
    }
});
