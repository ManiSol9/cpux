$(document).ready(function () {

    const form = document.querySelector('form');
    const name = document.getElementById('name');
    const armtemplates = document.getElementById('armtemplates');
    

    var applications = []

    applications = localStorage.getItem('applications') ? JSON.parse(localStorage.getItem('applications')) : [];
    business_units = localStorage.getItem('business_units') ? JSON.parse(localStorage.getItem('business_units')) : [];

    generateTable();
    generateSelect();

    function generateTable(){
        var txt='';

        myObj = applications;
        txt += "<table border='1'><tr><th> Application Name </th><th> BU's </th><th> Created At </th><th> Created By</th><th> Status</th><th>Actions</th></tr>"
        for (x in myObj) {
          txt += "<tr><td>" + myObj[x].name + "</td><td>" + myObj[x].bu + "</td><td>" + myObj[x].created_at + "</td><td>" + myObj[x].created_by + "</td><td>" + myObj[x].status + "</td>";
          txt += "<td><span onclick='showbu()' class='glyphicon glyphicon-info-sign' aria-hidden='true'></span>&nbsp;&nbsp;";
          txt += "<span onclick='deletebu()' class='glyphicon glyphicon-trash' aria-hidden='true'></span></td></tr>";
        }
        txt += "</table>"    
        document.getElementById("demo").innerHTML = txt;
    }

    function generateSelect(){
        var txt = '<select class="form-control" id="businessId">';
        myObj = business_units;
        for(x in myObj){
            txt +='<option value="'+ myObj[x].name +'">'+ myObj[x].name +'</option>';
        }
        txt += "</select>";
        document.getElementById("selectbu").innerHTML = txt;
    }

    deletebu = () => {
        alert("deleted")
    }

    showbu = () => {
        alert("showed")
    }


    $('#save-list').on('click', function (e) {

        if(name.value == "" || rsgroup.value == "" || type.value == "" || requestAnimationFrame.value == ""){

            //$("#entity").modal('hide');	
            
            alert("Please enter values")


        } else {

            var today = new Date();
            var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;   
            const businessId = document.getElementById('businessId')         

            var buObject = {
                "name": name.value,
                "bu": businessId.value,
                "created_at": dateTime,
                "created_by": "Manikanta",
                "status": true ,
                "resourceGroup": rsgroup.value,
                "resourceType": type.value,
                "resourceName": rsname.value,
                "value": "A"          
            }

            applications.push(buObject)
            localStorage.setItem('applications', JSON.stringify(applications));

            generateTable();

            $("#entity").modal('hide');			


        }



    });


});

	
