document.addEventListener('DOMContentLoaded',()=>{populateFieldsAndUI()})

function onButtonPress(button){
    // just send an action'object' to a single endpoint.
    const revokePermissionListDiv = document.getElementById('revokePermissionList')
    const grantPermissionListDiv = document.getElementById('grantPermissionList')
    const userSelect = document.getElementById('selectUserInput');

    const userDetails = userSelect.value.split("_");
    const _userId = parseInt(userDetails[userDetails.length-1]);

    const buttonValue = button.value;
    const buttonText = button.innerText;

    fetch('/admin/user-permissions', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: _userId,
            buttonValue: buttonValue,
            buttonText: buttonText
        })
    }).then(response => response.json())
        .then(response => {
            if (response.message=="success"){
                console.log(buttonValue)
                if (buttonText=='Revoke'){
                    let permissionGrantRow = document.createElement('p')
                    permissionGrantRow.innerHTML = `${buttonValue} <button value=${buttonValue} onclick="onButtonPress(this)">Grant</button>`
                    grantPermissionListDiv.appendChild(permissionGrantRow);
                    button.parentElement.hidden = true;
                }else if( buttonText=='Grant'){
                    let permissionRevokeRow = document.createElement('p')
                    permissionRevokeRow.innerHTML = `${buttonValue} <button value=${buttonValue} onclick="onButtonPress(this)">Revoke</button>`
                    revokePermissionListDiv.appendChild(permissionRevokeRow);
                    button.parentElement.hidden = true;
                }else{
                    blockButton.classList.value="";
                    if (buttonValue=='Block'){
                        blockButton.innerText = "Allow access to site"
                        blockButton.value = "Allow"
                        blockButton.classList.add(...["btn", "btn-outline-success","rounded-0"])
                    }else if(buttonValue=='Allow'){
                        blockButton.innerText = "Block access to site"
                        blockButton.value = "Block"
                        blockButton.classList.add(...["btn", "btn-outline-danger","rounded-0"])
                    }
                }
                alert("Successfuly updated permissions for user")
            }else{
                alert("failed, try again")
            }
        }).catch(error => {
            console.log(error);
            alert("Something went wrong, refresh page");
        });
}


function populateFieldsAndUI(){
    const userSelect = document.getElementById('selectUserInput');
    const blockButton = document.getElementById('blockButton');
    const revokePermissionListDiv = document.getElementById('revokePermissionList')
    const grantPermissionListDiv = document.getElementById('grantPermissionList')

    const userDetails = userSelect.value.split("_");
    const _userId = parseInt(userDetails[userDetails.length-1]);

    revokePermissionListDiv.innerHTML ="";
    grantPermissionListDiv.innerHTML ="";
    

    // fetch user permissions data
    fetch('/admin/user-permissions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: _userId
        })
    }).then(response => response.json())
        .then(userPermissions => {
            blockButton.classList.value="";
            // set correct button
            if (userPermissions.isBlocked){
                blockButton.innerText = "Allow access to site"
                blockButton.value = "Allow"
                blockButton.classList.add(...["btn", "btn-outline-success","rounded-0"])
            }else{
                blockButton.innerText = "Block access to site"
                blockButton.value = "Block"
                blockButton.classList.add(...["btn", "btn-outline-danger","rounded-0"])
            }

            // add active permission list (with revoke buttons)
            userPermissions.grantedPermissions.forEach(permission => {
                let permissionRevokeRow = document.createElement('p')
                permissionRevokeRow.innerHTML = `${permission} <button value=${permission} onclick="onButtonPress(this)">Revoke</button>`
                revokePermissionListDiv.appendChild(permissionRevokeRow);
            });

            // add permissions to grant list
            userPermissions.permissionsToGrant.forEach(permission => {
                let permissionGrantRow = document.createElement('p')
                permissionGrantRow.innerHTML = `${permission} <button value=${permission} onclick="onButtonPress(this)">Grant</button>`
                grantPermissionListDiv.appendChild(permissionGrantRow);
            });
        }).catch(error => {
            console.log(error);
            alert("Something went wrong, page will refresh");
            // location.assign('/admin/access-control')
        });
    
}