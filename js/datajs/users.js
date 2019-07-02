$(document).ready(function () {

    const form = document.querySelector('form');
    const name = document.getElementById('name');
    const armtemplates = document.getElementById('armtemplates');

    fetchUsers()

    function fetchUsers() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/users/getAllUsers",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
        }

        $.ajax(settings).done(function (response) {
            console.log(response, "users");

            users = response.result

            associatedusers = users

            generateTable();

        });

    }


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://dive11.azurewebsites.net/api/beta/applications/getAllApplications",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
        },
        "processData": false,
    }

    $.ajax(settings).done(function (response) {
        console.log(response, "app");

        apps = response.result

        applications = apps

        generateSelect2()

    });



    function generateTable() {
        var txt = '';

        myObj = associatedusers;
        txt += "<table class='table'><tr><th> Username </th><th> Role </th><th> Mail </th><th> Phone number </th><th>Actions</th></tr>"
        for (x in myObj) {
            txt += "<tr><td>" + myObj[x].name + "</td><td>" + myObj[x].designation + "</td><td>" + myObj[x].email_id + "</td>";
            txt += "<td>" + myObj[x].contact_number + "</td><td><span onclick='showbu()' class='glyphicon glyphicon-info-sign' aria-hidden='true'></span>&nbsp;&nbsp;";
            txt += "<span onclick='deletebu(" + myObj[x].id + ")' class='glyphicon glyphicon-trash' aria-hidden='true'></span></td></tr>";
        }
        txt += "</table>"
        document.getElementById("demo").innerHTML = txt;
    }


    function generateSelect2() {
        var txt = '<select  id="appId" class="form-control"><option value="">Please select application</option>';
        myObj = applications;
        for (x in myObj) {
            txt += '<option value="' + myObj[x].id + '">' + myObj[x].name + '</option>';
        }
        txt += "</select>";
        document.getElementById("selectapp").innerHTML = txt;
    }

    deletebu = (x) => {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/users/deleteUser?id=" + x,
            "method": "DELETE",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
        }

        $.ajax(settings).done(function (response) {
            console.log(response, "deviceadd");

            if (response.status == 200) {
                alert("Deleted Successfully");
                fetchUsers();
                //$("#entity").modal('hide');	
            }
        });

    }

    showbu = () => {
        alert("showed")
    }



    mani = () => {

        let headers = {
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFEQ29NcGpKWHJ4VHE5Vkc5dGUtN0ZYQndEd3pvcFk2cmstUEpzeDlsTXJ6UHJJVnducURBeS1aXzVmdnV4ZUxhUGZwdjB0djFkUE1EdksxRWtLbDhtN2VFVmZEVV9QTjhLbkgzVGxBdkRka3lBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiQ3RmUUM4TGUtOE5zQzdvQzJ6UWtacGNyZk9jIiwia2lkIjoiQ3RmUUM4TGUtOE5zQzdvQzJ6UWtacGNyZk9jIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9jZDk5ZmVmOC0xY2QzLTRhMmEtOWJkZi0xNTUzMTE4MWQ2NWUvIiwiaWF0IjoxNTYyMDcyMDkxLCJuYmYiOjE1NjIwNzIwOTEsImV4cCI6MTU2MjA3NTk5MSwiYWlvIjoiNDJaZ1lLaFkrRlQ5bmM2MDBsaTNHNHJOYkYyMUFBPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJESExJT1RDb21tb25BcHAiLCJhcHBpZCI6ImRlMjE1ODhmLTBkYzAtNDEzMy04NTMwLTIyNDQzY2E1ZWFkZCIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2NkOTlmZWY4LTFjZDMtNGEyYS05YmRmLTE1NTMxMTgxZDY1ZS8iLCJvaWQiOiJkOWQwMzcxYy1lN2NlLTRhM2EtYjQ3YS1iN2VjNmNmNmY2OGEiLCJyb2xlcyI6WyJVc2VyLlJlYWRXcml0ZS5BbGwiLCJEaXJlY3RvcnkuUmVhZFdyaXRlLkFsbCIsIlVzZXIuSW52aXRlLkFsbCIsIlVzZXIuUmVhZC5BbGwiXSwic3ViIjoiZDlkMDM3MWMtZTdjZS00YTNhLWI0N2EtYjdlYzZjZjZmNjhhIiwidGlkIjoiY2Q5OWZlZjgtMWNkMy00YTJhLTliZGYtMTU1MzExODFkNjVlIiwidXRpIjoiczZLTi1ZcDBCMGF2LWptMmJJNWFBQSIsInZlciI6IjEuMCIsInhtc190Y2R0IjoxNDA5OTA4MTc0fQ.fG0TOdQ-r2PSlIT_ReWjjiFjkwvCG-h4l3hKwHyXtTWexKFybDOfqE6wnc4WuCNWEBtMfRqL4SZdu2gRkesk0ALcXJVppzY8Pol2zSvNi3Co0E9wqU7kclZ55waT0h4YymEs15Z2B00C_BaXoHHzp-3_Mphvwfz_vfZuSJDYhE-hv1U9FuC7DA1L686Nj8V8gPDqhGr1kz5DZQbhKqT21-Xv1-ALDOEWLN4sbgc6UyHDdta3p1djQvfAr6uDzV7_XqIiLfw9b-3gSQs4vV75h5kGxrrJP9CeUN9hHc8TbuVn3jE0PaScUFA-glfBzSrUNJbdX8N7wT3sdCYKVl82TA",
            "Content-Type": "application/json"
        }

        let value = document.getElementById("email").value;

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(mailformat)) {

            var queryParam = "?$filter=startswith(mail, '" + value + "')"

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://graph.microsoft.com/v1.0/users" + queryParam,
                "method": "GET",
                "headers": headers,
                "processData": false,
            }

            $.ajax(settings).done(function (response) {

                console.log(response);

                if (response.value.length == 0) {

                    alert("Not a Valid user in AD")
                    document.getElementById("username").value = null
                    document.getElementById("phonenumber").value = null

                    document.getElementById("invite").style.display = "block"

                } else {

                    document.getElementById("username").value = response.value[0].displayName
                    document.getElementById("phonenumber").value = response.value[0].mobilePhone

                }


            });


        }
        else {

            alert("Not a valid email address")

        }



    }

    invite = () => {

        $("#entity").modal('hide');

        $("#entity1").modal('show');

        /*

        if(this.state.inviteDisplayName == '' || this.state.inviteUserEmail == ''){
            alert("Please fill the fields")
        } else {
            let email = this.state.inviteUserEmail

            axios({
                method: "POST",
                url: "https://graph.microsoft.com/v1.0/invitations",
                headers: headers,
                data: {
                    "invitedUserDisplayName": this.state.inviteDisplayName,
                    "invitedUserEmailAddress": this.state.inviteUserEmail,
                    "sendInvitationMessage": true,
                    "inviteRedirectUrl": "https://iot.dhl.com/",
                    "inviteRedeemUrl": "https://iot.dhl.com/"
                  }
            })
                .then(response => {
                    console.log(response)

                    if(response.status === 201){

                        alert("Invitation sent Successfully")

                    }

                })
                .catch(err => {
                    alert("Something went Problom!")
                    console.log(err);
                });
    
            this.handleCancel()
    
            event.preventDefault();


        }

        */

    }


    $('#save-list').on('click', function (e) {
        if (username.value == "" || email.value == "" || phonenumber.value == "" || address.value == "" || role.value == "") {
            alert("Please enter values")
        } else {

            e.preventDefault();

            var buObject = {
                "name": username.value,
                "appId": appId.value == "" ? null : appId.value,
                "designation": role.value,
                "email": email.value,
                "contact": phonenumber.value,
                "address": address.value,
                "createdBy": "Mani"
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/users/createUser",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
                },
                "processData": false,
                "data": JSON.stringify(buObject)
            }

            $.ajax(settings).done(function (response) {
                console.log(response, "users");

                if (response.status == 200) {
                    alert("Created Successfully");
                    fetchUsers();
                    $("#entity").modal('hide');
                }
            });
        }
    });

    $('#save-list1').on('click', function (e) {

        console.log(name1.value, email1.value)

        if (name1.value == "" || email1.value == "") {
            alert("Please enter values")
        } else {

            e.preventDefault();

            let headers = {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFEQ29NcGpKWHJ4VHE5Vkc5dGUtN0ZYQndEd3pvcFk2cmstUEpzeDlsTXJ6UHJJVnducURBeS1aXzVmdnV4ZUxhUGZwdjB0djFkUE1EdksxRWtLbDhtN2VFVmZEVV9QTjhLbkgzVGxBdkRka3lBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiQ3RmUUM4TGUtOE5zQzdvQzJ6UWtacGNyZk9jIiwia2lkIjoiQ3RmUUM4TGUtOE5zQzdvQzJ6UWtacGNyZk9jIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9jZDk5ZmVmOC0xY2QzLTRhMmEtOWJkZi0xNTUzMTE4MWQ2NWUvIiwiaWF0IjoxNTYyMDcyMDkxLCJuYmYiOjE1NjIwNzIwOTEsImV4cCI6MTU2MjA3NTk5MSwiYWlvIjoiNDJaZ1lLaFkrRlQ5bmM2MDBsaTNHNHJOYkYyMUFBPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJESExJT1RDb21tb25BcHAiLCJhcHBpZCI6ImRlMjE1ODhmLTBkYzAtNDEzMy04NTMwLTIyNDQzY2E1ZWFkZCIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2NkOTlmZWY4LTFjZDMtNGEyYS05YmRmLTE1NTMxMTgxZDY1ZS8iLCJvaWQiOiJkOWQwMzcxYy1lN2NlLTRhM2EtYjQ3YS1iN2VjNmNmNmY2OGEiLCJyb2xlcyI6WyJVc2VyLlJlYWRXcml0ZS5BbGwiLCJEaXJlY3RvcnkuUmVhZFdyaXRlLkFsbCIsIlVzZXIuSW52aXRlLkFsbCIsIlVzZXIuUmVhZC5BbGwiXSwic3ViIjoiZDlkMDM3MWMtZTdjZS00YTNhLWI0N2EtYjdlYzZjZjZmNjhhIiwidGlkIjoiY2Q5OWZlZjgtMWNkMy00YTJhLTliZGYtMTU1MzExODFkNjVlIiwidXRpIjoiczZLTi1ZcDBCMGF2LWptMmJJNWFBQSIsInZlciI6IjEuMCIsInhtc190Y2R0IjoxNDA5OTA4MTc0fQ.fG0TOdQ-r2PSlIT_ReWjjiFjkwvCG-h4l3hKwHyXtTWexKFybDOfqE6wnc4WuCNWEBtMfRqL4SZdu2gRkesk0ALcXJVppzY8Pol2zSvNi3Co0E9wqU7kclZ55waT0h4YymEs15Z2B00C_BaXoHHzp-3_Mphvwfz_vfZuSJDYhE-hv1U9FuC7DA1L686Nj8V8gPDqhGr1kz5DZQbhKqT21-Xv1-ALDOEWLN4sbgc6UyHDdta3p1djQvfAr6uDzV7_XqIiLfw9b-3gSQs4vV75h5kGxrrJP9CeUN9hHc8TbuVn3jE0PaScUFA-glfBzSrUNJbdX8N7wT3sdCYKVl82TA",
                "Content-Type": "application/json"
            }

            var data = {
                "invitedUserDisplayName": name1.value,
                "invitedUserEmailAddress": email1.value,
                "sendInvitationMessage": true,
                "inviteRedirectUrl": "https://iot.dhl.com/",
                "inviteRedeemUrl": "https://iot.dhl.com/"
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://graph.microsoft.com/v1.0/invitations",
                "method": "POST",
                "headers": headers,
                "processData": false,
                "data": JSON.stringify(data)
            }

            $.ajax(settings).done(function (response) {
                console.log(response, "users");

                if(response.sendInvitationMessage == true){

                    alert("Invitation sent Successfully and we will notify once user accept invite!")

                } else {

                    alert("Somthing went wrong!")
                }

                $("#entity1").modal('hide');

                
            });
        }
    });

});


