$(document).ready(function () {

    const form = document.querySelector('form');
    const name = document.getElementById('name');
    const armtemplates = document.getElementById('armtemplates');
    

    var applications = []

    fecthGroups();
    fetchApps();

    function fetchApps(){

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
    
            app = response.result
    
            applications = app.data
    
            generateTable();
    
        });


    }

    function fecthGroups(){

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/blobStorage/getAzureResourceGroups",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response, "app");

            rsgroups = response.result

            generateSelect2(rsgroups);

        });
    }

    

    function generateSelect2(rsgroups){
        var txt = '<select id="resolurce" class="form-control"><option value="">Please select resource group</option>';
        myObj = rsgroups;
        for(x in myObj){
                txt +='<option value="'+ myObj[x] +'">'+ myObj[x] +'</option>';
        }
        txt += "</select>";

        document.getElementById("selectapp").innerHTML = txt;
    }

    fetchBu()

    function fetchBu(){

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/businessunits/getBusinessUnits",
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
            console.log(response, "bus");
            bu = response.result
            business_units = bu.data
            generatebu(business_units)
        });

    }

    function generatebu(business_units){
        var txt = '<select id="buid" class="form-control"><option value="">Please select BU</option>';
        myObj = business_units;
        for(x in myObj){
                txt +='<option value="'+ myObj[x].id +'">'+ myObj[x].name +'</option>';
        }
        txt += "</select>";

        document.getElementById("selectbu").innerHTML = txt;
    }


    

    function generateTable(){
        var txt='';

        myObj = applications;
        txt += "<table border='1'><tr><th> Application Name </th><th> BU's </th><th> Owner </th><th> Onboarded At </th><th>Resourse Group</th><th> Status</th><th>Actions</th></tr>"
        for (x in myObj) {
          txt += "<tr><td>" + myObj[x].name + "</td><td>" + myObj[x].buname + "</td><td>" + myObj[x].owner + "</td><td>" + myObj[x].onboarded_date + "</td><td>"+ myObj[x].resource_group_name +"</td><td>" + myObj[x].status + "</td>";
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

        if(name.value == "" || resolurce.value == "" || owner.value == "" || description.value == "" || buid.value == ""){
            
            alert("Please enter values")


        } else {
    

            var buObject = {
                "appName" : name.value,
                "appOwner": owner.value,
                "appStatus" : "Active",
                "appGroupName" : "NA",
                "appCreatedBy" : "mani",
                "resourceGroupName" : resolurce.value,
                "appDescription" : description.value,
                "buID" : buid.value,
                "appRoleIDs" : [1,2],
                "imgData" : ""                 
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/applications/createApplication",
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
                    fetchApps();
                    $("#entity").modal('hide');	
                }
            });            
        }
    });

    


});

	
