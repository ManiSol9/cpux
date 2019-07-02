$(document).ready(function () {

    const form = document.querySelector('form');
    const name = document.getElementById('name');
    const armtemplates = document.getElementById('armtemplates');
    
    fetchUsers()

    function fetchUsers(){

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/users/getUsers",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
            "data": "{\n\t\"pageNumber\": 1,\n\t\"pageSize\": 10,\n\t\"search\": null,\n\t\"sortColumn\": \"name\",\n\t\"sortType\": 0\n}"
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response, "users");
    
            users = response.result
    
            associatedusers = users.data
    
            generateTable();
    
        });

    }


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://dive11.azurewebsites.net/api/beta/applications/getApplications",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
        },
        "processData": false,
        "data": "{\n\t\"pageNumber\": 1,\n\t\"pageSize\": 10,\n\t\"search\": null,\n\t\"sortColumn\": \"name\",\n\t\"sortType\": 0\n}"
    }

    $.ajax(settings).done(function (response) {
        console.log(response, "app");

        apps = response.result

        applications = apps.data

        generateSelect2()

    });



    function generateTable(){
        var txt='';

        myObj = associatedusers;
        txt += "<table border='1'><tr><th> Username </th><th> Role </th><th> Mail </th><th> Phone number </th><th>Actions</th></tr>"
        for (x in myObj) {
          txt += "<tr><td>" + myObj[x].name + "</td><td>" + myObj[x].designation + "</td><td>" + myObj[x].email_id + "</td>";
          txt += "<td>" + myObj[x].contact_number + "</td><td><span onclick='showbu()' class='glyphicon glyphicon-info-sign' aria-hidden='true'></span>&nbsp;&nbsp;";
          txt += "<span onclick='deletebu()' class='glyphicon glyphicon-trash' aria-hidden='true'></span></td></tr>";
        }
        txt += "</table>"    
        document.getElementById("demo").innerHTML = txt;
    }


    function generateSelect2(){
        var txt = '<select  id="appId" class="form-control">';
        myObj = applications;
        for(x in myObj){
                txt +='<option value="'+ myObj[x].id +'">'+ myObj[x].name +'</option>';
        }
        txt += "</select>";
        document.getElementById("selectapp").innerHTML = txt;
    }

    deletebu = () => {
        var arr = associatedusers
        //delete arr[x]

		console.log(x)
		//var index = arr.indexOf(x);
		if (x > -1) {
			arr.splice(x, 1);
		}		
		
		localStorage.setItem('associatedusers', JSON.stringify(arr));
        generateTable();
    }

    showbu = () => {
        alert("showed")
    }


    $('#save-list').on('click', function (e) { 
        if(username.value == "" || email.value == "" || phonenumber.value == "" || address.value == "" || role.value == "" || appId.value == ""){
            alert("Please enter values")
        } else {

            e.preventDefault();
       
            var buObject = {
                "name": username.value,
                "appId": appId.value,
                "designation": role.value,
                "email": email.value,
                "contact": phonenumber.value,
                "address": address.value
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

                if(response.status == 200){
                    alert("Created Successfully");
                    fetchUsers();
                    $("#entity").modal('hide');	
                }
            });
        }
    });

});

	
