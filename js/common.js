$(document).ready(function () {

    const form = document.querySelector('form');
    const name = document.getElementById('name');
	const armtemplates = document.getElementById('armtemplates');

    var business_units = [
        {
            "name": "GUI",
            "created_at": "2018/09/10 10:30:33AM",
            "created_by": "Manikanta",
            "status": true,
            "armtemplates": "",
            "id": 1,
            "value": "B"
        },
        {
            "name": "CSA",
            "created_at": "2018/09/10 10:30:33AM",
            "created_by": "Manikanta",
            "status": true,
            "armtemplates": "",
            "id": 2,
            "value": "B"
        }
    ]

    //localStorage.setItem('business_units', JSON.stringify(business_units));

    business_units = localStorage.getItem('business_units') ? JSON.parse(localStorage.getItem('business_units')) : [];


    generateTable();

    function generateTable(){
        var txt='';

        myObj = business_units;
        txt += "<table border='1'><tr><th> Business Name </th><th> Created On </th><th> Created By</th><th>Actions</th></tr>"
        for (x in myObj) {
          txt += "<tr><td>" + myObj[x].name + "</td><td>" + myObj[x].created_at + "</td><td>" + myObj[x].created_by + "</td>";
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

        if(name.value == "" || armtemplates.value == ""){

            //$("#entity").modal('hide');	
            
            alert("Please enter values")


        } else {

            var today = new Date();
            var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;            

            var buObject = {
                "name": name.value,
                "created_at": dateTime,
                "created_by": "Manikanta",
                "status": true ,
                "armtemplates": armtemplates.value          
            }

            business_units.push(buObject)
            localStorage.setItem('business_units', JSON.stringify(business_units));

            generateTable();

            $("#entity").modal('hide');			


        }



    });


});

	
