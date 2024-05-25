function onSenda(){
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;
    const email = document.getElementById('selectUserInput').value;

    if (rating=='' || comment=='' || email==''){
        alert("Empty field(s), check!");
        return;
    }

    fetch('/feedback/createentry', {
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
    
    document.getElementById('rating').value = '';
    document.getElementById('comment').value = '';
    document.getElementById('email').value = '';
}

function viewFeedbacks() {
    fetch('/feedback/listing')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(apiJsonData => {
            console.log("Fetched feedbacks:", apiJsonData);
            localStorage.setItem('feedbacks', JSON.stringify(apiJsonData));
            window.location.href = '/feedback/posted'
        })
        .catch(error => {
            console.error('Error fetching feedbacks:', error);
        });
    
}

function checkFeedbacks() {
    fetch('/feedback/listingtwo')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(apiJsonData => {
            console.log("Fetched feedbacks:", apiJsonData);
            localStorage.setItem('feedbacks', JSON.stringify(apiJsonData));
            window.location.href = '/feedback/postedtwo'
        })
        .catch(error => {
            console.error('Error fetching feedbacks:', error);
        });
    
}

function requestFeedbacks() {
    fetch('/feedback/role')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.status);
            }
            return response.json();
        })
        .then(role => {
            if (role.roleName !== "HR") {
                alert("Only HR is allowed to send requests");
                return;
            }

            const rating = "0";
            const comment = "HR FeedBack Request";
            const email = document.getElementById('selectUserInput').value;

            if (rating === '' || comment === '' || email === '') {
                alert("Empty field(s), check!");
                return;
            }

            fetch('/feedback/createentry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    feedBack: comment,
                    feedBackRating: rating,
                    feedBackEmail: email
                })
            }).then(response => response.json())
                .then(response => {
                    if (response.message === "success") {
                        alert("Request Sent");
                    } else if (response.message === "failed") {
                        alert("Something went wrong");
                    }
                }).catch(error => {
                    console.error('Error:', error);
                    alert("Something went wrong, please try again");
                });
        })
        .catch(error => {
            console.error('Error fetching role:', error);
            alert("Please type in request details");
        });
}

function fetchFeedbacks() {
    fetch('/feedback/listingthree')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(apiJsonData => {
            console.log("Fetched feedbacks:", apiJsonData);
            localStorage.setItem('feedbacks', JSON.stringify(apiJsonData));
            window.location.href = '/feedback/postedthree';
        })
        .catch(error => {
            console.error('Error fetching feedbacks:', error);
        });
}
