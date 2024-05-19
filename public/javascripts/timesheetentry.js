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
                //console.log(response);
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
}