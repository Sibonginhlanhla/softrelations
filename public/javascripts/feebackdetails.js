function onSenda(){
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;
    const email = document.getElementById('email').value;

    if (rating=='' || comment=='' || email==''){
        alert("Empty field(s), check!");
        return;
    }

    fetch('/feedaback/createentry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            feedBack : comment,
            feedBackRating : rating,
            feedBackEmail : email
        })
    }).then(response => response.json())
        .then(response => {
            if(response.message=="success"){
                alert("Feedback Sent");
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