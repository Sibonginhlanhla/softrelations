document.addEventListener('DOMContentLoaded',()=>{populateUpdateFields()})

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

function onRemoveUser(){
    const userSelect = document.getElementById('userSelectDeleteInput');

    const userDetails = userSelect.options[userSelect.selectedIndex].text.split("_");
    const userId = parseInt(userDetails[userDetails.length-1]);

    fetch(`/admin/user-remove/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())
        .then(response => {
            if(response.message=="success"){
                alert(`Success. ${userId} deleted`);
                location.assign('/admin/user-management');
            }else if(response.message=="failed"){
                alert("Something went wrong, page will refresh");
                location.assign('/admin/user-management');
            }
        }).catch(error => {
            console.log(error);
            alert("Something went wrong, page will refresh");
            location.assign('/admin/user-management');
        });
}

function onUpdateUser(){
    const firstNameInput = document.getElementById('firstNameUpdateInput');
    const lastNameInput = document.getElementById('lastNameUpdateInput');
    const emailInput = document.getElementById('emailUpdateInput');
    const roleSelect = document.getElementById('roleSelectUpdateInput');
    const userSelect = document.getElementById('userSelectUpdateInput');

    const userDetails = userSelect.value.split("_");
    const userId_ = parseInt(userDetails[userDetails.length-1]);

    fetch('/admin/user-update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            role: roleSelect.options[roleSelect.selectedIndex].text,
            userId: userId_
        })
    }).then(response => response.json())
        .then(response => {
            if(response.message=="success"){
                alert("Update success.Page will refresh");
                location.assign('/admin/user-management');
            }else if(response.message=="failed"){
                alert("Failed and aborted. page will reload");
                location.assign('/admin/user-management');
            }
        }).catch(error => {
            console.log(error);
            alert("something went wrong, please try again");
        });
}

function populateUpdateFields(){
    const firstNameInput = document.getElementById('firstNameUpdateInput');
    const lastNameInput = document.getElementById('lastNameUpdateInput');
    const emailInput = document.getElementById('emailUpdateInput');
    const roleSelect = document.getElementById('roleSelectUpdateInput');

    const userSelect = document.getElementById('userSelectUpdateInput');
    const userDetails = userSelect.value.split("_");

    firstNameInput.value = userDetails[0];
    lastNameInput.value = userDetails[1];
    roleSelect.value = userDetails[2];
    emailInput.value = userDetails[3];
}