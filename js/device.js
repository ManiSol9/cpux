$(document).ready(function () {

    const form = document.querySelector('form');
    const name = document.getElementById('name');
    const armtemplates = document.getElementById('armtemplates');
    

    //localStorage.setItem('associateddevices', []);
    associateddevices = localStorage.getItem('associateddevices') ? JSON.parse(localStorage.getItem('associateddevices')) : [];
    business_units = localStorage.getItem('business_units') ? JSON.parse(localStorage.getItem('business_units')) : [];
    applications = localStorage.getItem('applications') ? JSON.parse(localStorage.getItem('applications')) : [];

    console.log(associateddevices)
    
    if(associateddevices.length>0) { 
        generateTable(); 
    }
    generateSelect();
    //generateSelect2()

    function generateTable(){
        var txt='';

        myObj = associateddevices;
        txt += "<table border='1'><tr><th> Device ID </th><th> Device Name </th><th> Device Type </th><th> Device Vendor </th><th> Protocol </th><th> Application </th> <th> BU </th><th>Health Status</th><th> Battery Power</th> <th> On Boarded By</th> <th> Device Owner </th> <th>Actions</th></tr>"
        for (x in myObj) {
          txt += "<tr><td>" + myObj[x].deviceId + "</td><td>" + myObj[x].name + "</td><td>" + myObj[x].deviceType + "</td><td>" + myObj[x].deviceVendor + "</td><td>" + myObj[x].protocol + "</td>";
          txt += "<td>" + myObj[x].appname + "</td><td>" + myObj[x].bu + "</td><td>" + myObj[x].heathStatus + "</td><td>" + myObj[x].batteryPower + "</td><td>" + myObj[x].created_by + "</td><td>" + myObj[x].created_by + "</td><td>";
          txt += "<span onclick='deletebu("+x+")' class='glyphicon glyphicon-trash' aria-hidden='true'></span></td></tr>";
        }
        txt += "</table>"    
        document.getElementById("demo").innerHTML = txt;
    }

    function generateSelect(){
        var txt = '<select id="businessId" onchange="showapps()" class="form-control">';
        myObj = business_units;
        for(x in myObj){
            txt +='<option value="'+ myObj[x].name +'">'+ myObj[x].name +'</option>';
        }
        txt += "</select>";
        document.getElementById("selectbu").innerHTML = txt;
    }

    showapps = (e) => {
        generateSelect2(businessId.value)
        console.log(applications)
    }

    function generateSelect2(bu){
        var txt = '<select  id="appId" class="form-control">';
        myObj = applications;
        for(x in myObj){
            if(myObj[x].bu == bu) {
                txt +='<option value="'+ myObj[x].name +'">'+ myObj[x].name +'</option>';
            }
        }
        txt += "</select>";
        document.getElementById("selectapp").innerHTML = txt;
    }

    deletebu = (x) => {
        var arr = associateddevices
        //delete arr[x]

		console.log(x)
		//var index = arr.indexOf(x);
		if (x > -1) {
			arr.splice(x, 1);
		}		
		
		localStorage.setItem('associateddevices', JSON.stringify(arr));
        generateTable();
		
		
    }

    showbu = () => {
        alert("showed")
    }


    $('#save-list').on('click', function (e) {


        if(deviceId.value == "" || deviceName.value == "" || deviceType.value == "" || deviceVendor.value == "" || protocol.value == "" || businessId == ""){
            alert("Please enter values")
        } else {

            e.preventDefault();

            var today = new Date();
            var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;   
            const businessId = document.getElementById('businessId')         
            var buObject = {
                "deviceId": deviceId.value,
                "name": deviceName.value,
                "deviceType": deviceType.value,
                "deviceVendor": deviceVendor.value,
                "protocol": protocol.value,
                "bu": businessId.value,
                "appname": appId.value,
                "created_at": dateTime,
                "created_by": "Manikanta",
                "heathStatus": false,
                "batteryPower": "10%",
                "deviceOwner": "Mani"        
            }
            associateddevices.push(buObject)
            localStorage.setItem('associateddevices', JSON.stringify(associateddevices));
            generateTable();
            $("#entity").modal('hide');			
        }
    });

});

	
