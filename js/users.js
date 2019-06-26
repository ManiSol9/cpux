$(document).ready(function () {

    const form = document.querySelector('form');
    const name = document.getElementById('name');
    const armtemplates = document.getElementById('armtemplates');
    

    var users = [
        {
            "name": "Manikanta",
            "bu": "GUI",
            "appname": "Track",
            "role": "",
            "email": "",
            "contact": "",
            "created_at": "2018/09/10 10:30:33AM",
            "created_by": "Manikanta",
            "status": true,
            "armtemplates": "",
            "id": 1,
            "value": "U"
        },
        {
            "name": "Krishna",
            "bu": "CSA",
            "appname": "Trace",
            "role": "",
            "email": "",
            "contact": "",
            "created_at": "2018/09/10 10:30:33AM",
            "created_by": "Manikanta",
            "status": true,
            "armtemplates": "",
            "id": 2,
            "value": "U"
        }
    ]

    //localStorage.setItem('associatedusers', JSON.stringify(users));
    associatedusers = localStorage.getItem('associatedusers') ? JSON.parse(localStorage.getItem('associatedusers')) : [];
    business_units = localStorage.getItem('business_units') ? JSON.parse(localStorage.getItem('business_units')) : [];
    applications = localStorage.getItem('applications') ? JSON.parse(localStorage.getItem('applications')) : [];

    
    console.log(associatedusers)
    
    generateTable();
    generateSelect();
    //generateSelect2()

    function generateTable(){
        var txt='';

        myObj = associatedusers;
        txt += "<table border='1'><tr><th> Username </th><th> Application Name </th><th> BU's </th><th> Role </th><th> Mail </th><th> Phone number </th><th>Actions</th></tr>"
        for (x in myObj) {
          txt += "<tr><td>" + myObj[x].name + "</td><td>" + myObj[x].appname + "</td><td>" + myObj[x].bu + "</td><td>" + myObj[x].role + "</td><td>" + myObj[x].email + "</td>";
          txt += "<td>" + myObj[x].contact + "</td><td><span onclick='showbu()' class='glyphicon glyphicon-info-sign' aria-hidden='true'></span>&nbsp;&nbsp;";
          txt += "<span onclick='deletebu()' class='glyphicon glyphicon-trash' aria-hidden='true'></span></td></tr>";
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
        if(username.value == "" || responsibilities.value == ""){
            alert("Please enter values")
        } else {

            e.preventDefault();

            var today = new Date();
            var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;   
            const businessId = document.getElementById('businessId')         
            var buObject = {
                "name": username.value,
                "bu": businessId.value,
                "appname": appId.value,
                "role": role.value,
                "email": email.value,
                "contact": phonenumber.value,
                "created_at": dateTime,
                "created_by": "Manikanta",
                "responsibilities": responsibilities.value,
                "value": "U"     
            }
            associatedusers.push(buObject)
            localStorage.setItem('associatedusers', JSON.stringify(associatedusers));
            generateTable();
            $("#entity").modal('hide');			
        }
    });

});

	
