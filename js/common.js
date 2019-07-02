$(document).ready(function () {

    const form = document.querySelector('form');
    const name = document.getElementById('name');
    const armtemplates = document.getElementById('armtemplates');

    var bu = {}

    fetchBU();

    function fetchBU(){

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/businessunits/getAllBusinessUnits",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response, "bus");
    
            bu = response.result
    
            business_units = bu
    
            generateTable();
    
        });
    

    }

    function generateTable() {
        var txt = '';

        myObj = business_units;
        txt += "<table border='1'><tr><th> Business Name </th><th> Created On </th><th> Created By</th><th>Actions</th></tr>"
        for (x in myObj) {
            txt += "<tr><td>" + myObj[x].name + "</td><td>" + myObj[x].created_by + "</td><td>" + myObj[x].created_date + "</td>";
            txt += "<td><span onclick='showbu()' class='glyphicon glyphicon-info-sign' aria-hidden='true'></span>&nbsp;&nbsp;";
            txt += "<span onclick='deletebu()' class='glyphicon glyphicon-trash' aria-hidden='true'></span></td></tr>";
        }
        txt += "</table>"
        document.getElementById("demo").innerHTML = txt;
    }

    deletebu = () => {
        alert("deleted")
    }

    showbu = () => {
        alert("showed")
    }


    $('#save-list').on('click', function (e) {

        if (name.value == "" || description.value == "" || shortname.value == "" || owner.value == "") {

            alert("Please enter values")

        } else {


            var buObject = {
                "name": name.value,
                "shortName": shortname.value,
                "description": description.value,
                "owner": owner.value,
                "createdBy": "Mani",
                "userGroup": "",
                "imgName": ""
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/businessunits/createBusinessUnit",
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
                console.log(response, "deviceadd");

                if(response.status == 200){
                    alert("Created Successfully");
                    fetchBU();
                    $("#entity").modal('hide');	
                }
            });  


        }



    });


});


