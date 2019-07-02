$(document).ready(function () {

    const form = document.querySelector('form');
    const name = document.getElementById('name');
    const armtemplates = document.getElementById('armtemplates');
    

    getDevices();

    function getDevices(){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/devices/getAllDevices",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response, "device");
    
            devices = response.result
    
            associateddevices = devices
    
            generateTable();
    
        });
    }


    function generateTable(){
        var txt='';

        myObj = associateddevices;
        txt += "<table class='table'><tr><th> Device ID </th><th> Device Name </th><th> Device Address </th><th> Protocol </th><th>Health Status</th><th> Battery Power</th> <th> On Boarded By</th> <th> Device Owner </th> <th>Actions</th></tr>"
        for (x in myObj) {
          txt += "<tr><td>" + myObj[x].dhl_device_id + "</td><td>" + myObj[x].device_name + "</td><td>" + myObj[x].mac_address + "</td><td>" + myObj[x].protocol + "</td>";
          txt += "<td>" + myObj[x].device_health + "</td><td>" + myObj[x].power_type + "</td><td>" + myObj[x].device_owner + "</td><td>" + myObj[x].onboarded_date + "</td><td>";
          txt += "<span onclick='deletebu("+myObj[x].id+")' class='glyphicon glyphicon-trash' aria-hidden='true'></span></td></tr>";
        }
        txt += "</table>"    
        document.getElementById("demo").innerHTML = txt;
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

    function generateSelect2(){
        var txt = '<select  id="appId" class="form-control"><option value="">Please select app</option>';
        myObj = applications;
        for(x in myObj){
                txt +='<option value="'+ myObj[x].id +'">'+ myObj[x].name +'</option>';
        }
        txt += "</select>";
        document.getElementById("selectapp").innerHTML = txt;
    }

    deletebu = (x) => {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/devices/deleteDevice?id="+x,
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

            if(response.status == 200){
                alert("Deleted Successfully");
                getDevices();
                //$("#entity").modal('hide');	
            }
        });

    }

    showbu = () => {
        alert("showed")
    }



    $('#save-list').on('click', function (e) {


        if( deviceId.value == "" || 
            deviceName.value == "" || 
            deviceUUID.value == "" || 
            serialnumber.value == "" || 
            protocol.value == "" || 
            deviceHealth.value == "" ||
            macaddress.value == "" ||
            powertype.value == "" ||
            iotready.value == ""){
            alert("Please enter values")
        } else {

            e.preventDefault();

            let deviceAdd = {
                "dhlDeviceID" : deviceId.value,
                "uuID": deviceUUID.value,
                "serialNumber" : serialnumber.value,
                "macAddress" : macaddress.value,
                "deviceName" : deviceName.value,
                "protocol" : protocol.value,
                "deviceHealth" : deviceHealth.value,
                "onboardedBy" : "mani",
                "deviceOwner" : "Tina",
                "powerType" : powertype.value,
                "appID" : appId.value,
                "iotReady" : iotready.value == "0" ? true : false,
                "deviceSpecID" : 2,
                "is_exists": true
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/devices/createDevice",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
                },
                "processData": false,
                "data": JSON.stringify(deviceAdd)
            }
        
            $.ajax(settings).done(function (response) {
                console.log(response, "deviceadd");

                if(response.status == 200){
                    alert("Created Successfully");
                    getDevices();
                    $("#entity").modal('hide');	
                }
            });

        }
    });

});

	
