document.addEventListener('DOMContentLoaded', function() {
    // Fetch the timesheets data from the server
    fetch('/timesheets/listing')
        .then(response => {
            if (!response.ok) {fetch
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(apiJsonData => {
            //console.log(apiJsonData);
            renderDataInTheTable(apiJsonData);
        })
        .catch(error => {
            console.error('Error fetching timesheets:', error);
        });

    function renderDataInTheTable(todos) {
        const mytable = document.getElementById("timesheetTable").getElementsByTagName('tbody')[0];
        mytable.innerHTML = '';
        todos.forEach(todo => {
            let newRow = document.createElement("tr");
            Object.values(todo).forEach((value) => {
                let cell = document.createElement("td");
                cell.innerText = value;
                newRow.appendChild(cell);
            });
            mytable.appendChild(newRow);
        });
    }
});
