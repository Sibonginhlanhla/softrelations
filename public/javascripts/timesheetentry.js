function onEntry(){
    const date = document.getElementById('date').value;
    const task = document.getElementById('task').value;
    const hours = document.getElementById('hours').value;

    if (date=='' || task=='' || hours==''){
        alert("Empty field(s), check!");
        return;
    }

    fetch('/timesheets/createentry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dateOfEntry : date,
            taskDone : task,
            hourSpent : hours
        })
    }).then(response => response.json())
        .then(response => {
            if(response.message=="success"){
                alert("Talk about dedication! Task successfully added.");
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
                document.getElementById('date').value = '';
                document.getElementById('task').value = '';
                document.getElementById('hours').value = '';

                //location.assign('/dashboard')
            }else if(response.message=="failed"){
                task ='';
                date='';
                hours='';
                alert("something went wrong");
            }
        }).catch(error => {
            task ='';
            date='';
            hours='';
            console.log(error);
            alert("something went wrong, please try again");
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
}