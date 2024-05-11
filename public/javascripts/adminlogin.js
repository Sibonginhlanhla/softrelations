
function onLogIn(){
    const inputId = document.getElementById('inputId');
    const inputPassword = document.getElementById('inputPassword');

    fetch('/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            adminid: inputId.value,
            password: inputPassword.value
        })
    }).then(response => response.json())
        .then(response => {
            if(response.message=="success"){
                location.assign('/admin')
            }else if(response.message=="failed"){
                inputId.value ='';
                inputPassword.value='';
                alert("insert correct login details");
            }
        }).catch(error => {
            inputId.value ='';
            inputPassword.value='';
            console.log(error);
            alert("something went wrong, please try again");
        });
}