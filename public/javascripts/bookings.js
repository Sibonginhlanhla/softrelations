document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', book);
    }
});

function book() {
    const date = document.getElementById('date').value;
    const bookingType = document.getElementById('bookingType').value;
    const bookingDescription = document.getElementById('bookingDescription').value;

    if (date === '' || bookingType === '' || bookingDescription === ''){
        alert("Empty field(s), check!");
        return;
    }

    fetch('/bookings/createentry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: date,
            bookingType: bookingType,
            bookingDescription: bookingDescription
        })
    }).then(response => response.json())
        .then(response => {
            if (response.message === "success") {
                alert("Booking saved successfully");
                fetchBookings(); // Fetch and render the updated bookings
            } else {
                alert("Something went wrong");
            }
        }).catch(error => {
            console.log(error);
            alert("Something went wrong, please try again");
        });

    document.getElementById('date').value = '';
    document.getElementById('bookingType').value = '';
    document.getElementById('bookingDescription').value = '';
}


function fetchBookings() {
    fetch('/bookings/listing')
        .then(response => response.json())
        .then(data => renderDataInTheTable(data))
        .catch(error => console.error('Error fetching bookings:', error));
}

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
