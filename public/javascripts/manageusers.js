function onAddUser(){
    const firstNameInput = document.getElementById('firstNameInput');
    const lastNameInput = document.getElementById('lastNameInput');
    const emailInput = document.getElementById('emailInput');
    const roleSelect = document.getElementById('roleSelectInput');

    if (firstNameInput.value=='' || lastNameInput.value=='' || emailInput.value==''){
        alert("Empty field(s), check!");
        return;
    }

    fetch('/admin/user-add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            role: roleSelect.options[roleSelect.selectedIndex].text
        })
    }).then(response => response.json())
        .then(response => {
            if(response.message=="success"){
                alert("Successful");
            }else if(response.message=="failed"){
                firstNameInput.value = '';
                lastNameInput.value = '';
                emailInput.value = '';
                alert("User with email already exists");
            }
        }).catch(error => {
            firstNameInput.value = '';
            lastNameInput.value = '';
            emailInput.value = '';
            console.log(error);
            alert("something went wrong, please try again");
        });
}