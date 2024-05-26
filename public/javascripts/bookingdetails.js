document.addEventListener('DOMContentLoaded', function() {
    // Fetch the bookings data from the server
    fetch('/bookings/listing')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(apiJsonData => {
            renderDataInTheTable(apiJsonData);
        })
        .catch(error => {
            console.error('Error fetching bookings:', error);
        });

    
    });

function renderDataInTheTable(bookings) {
    const mytable = document.getElementById("bookingTable").getElementsByTagName('tbody')[0];
    mytable.innerHTML = '';
    bookings.forEach(booking => {
        let newRow = document.createElement("tr");
        Object.values(booking).forEach((value) => {
            let cell = document.createElement("td");
            cell.innerText = value;
            newRow.appendChild(cell);
        });
        mytable.appendChild(newRow);
    });
}