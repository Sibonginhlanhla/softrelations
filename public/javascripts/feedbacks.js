document.addEventListener('DOMContentLoaded', (event) => {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks'));
    if (feedbacks) {
        renderDataInTheTable(feedbacks);
    }
});

function renderDataInTheTable(feedbacks) {
    const myTable = document.getElementById("feedbackTable").getElementsByTagName('tbody')[0];
    myTable.innerHTML = '';
    feedbacks.forEach(feedback => {
        let newRow = document.createElement("tr");
        Object.values(feedback).forEach(value => {
            let cell = document.createElement("td");
            cell.innerText = value;
            newRow.appendChild(cell);
        });
        myTable.appendChild(newRow);
    });
}
