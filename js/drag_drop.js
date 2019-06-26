$(document).ready(function () {
    const form = document.querySelector('form');
    const input = document.getElementById('item');
	const type = document.getElementById('type');
    var source_Array = [];
    var destination_Array = [];
	var past_Array = []

    var main_source_Array = [];
    var main_destination_Array = [];
    var dbdata = [];
	
	var BUS = [{value: "B", id: 1, name: "BU"}]
	var APP = [{value: "A", id: 1, name: "APP"}]
	var USERS = [{value: "U", id: 1, name: "Manikanta"}, {value: "U", id: 5, name: "Murali"}, {value: "U", id: 2, name: "Srini"}, {value: "U", id: 3, name: "Nikunj"}, {value: "U", id: 4, name: "Param"}]
	


	
	localStorage.setItem('bus', JSON.stringify(BUS));
    localStorage.setItem('apps', JSON.stringify(APP));
    localStorage.setItem('users', JSON.stringify(USERS));
	
	bu_Array = localStorage.getItem('bus') ? JSON.parse(localStorage.getItem('bus')) : BUS;
    app_Array = localStorage.getItem('apps') ? JSON.parse(localStorage.getItem('apps')) : APP;
    users_Array = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : USERS;

    source_Array = localStorage.getItem('source') ? JSON.parse(localStorage.getItem('source')) : [];
	past_Array = localStorage.getItem('past_source') ? JSON.parse(localStorage.getItem('past_source')) : [];
    dbdata = localStorage.getItem('dbdata') ? JSON.parse(localStorage.getItem('dbdata')) : [];
    localStorage.setItem('source', JSON.stringify(source_Array));
    localStorage.setItem('dbdata', JSON.stringify(dbdata));
    source_Array = JSON.parse(localStorage.getItem('source'));
    dbdata = JSON.parse(localStorage.getItem('dbdata'));


    /* create association */
    
    var associatedusers = localStorage.getItem('associatedusers') ? JSON.parse(localStorage.getItem('associatedusers')) : [];
    var business_units = localStorage.getItem('business_units') ? JSON.parse(localStorage.getItem('business_units')) : [];
    var applications = localStorage.getItem('applications') ? JSON.parse(localStorage.getItem('applications')) : [];
    var associateddevices = localStorage.getItem('associateddevices') ? JSON.parse(localStorage.getItem('associateddevices')) : [];

    var association = []

    var children = []
	
	var data = {
		"name": "User Group",
		"value": "U",
		"children": []
	}
	
	var data1 = {
		"name": "Devices",
		"value": "D",
		"children": []
	}
	
	children.push(data); children.push(data1)
	
	
	for(i=0;i<applications.length;i++){
		applications[i].children = children
	}
		
	console.log(applications, "applications")
	
	

    var ind = 0
    for(i=0;i<associatedusers.length;i++){
        var user = associatedusers[i]
        if(applications.find( app => (app.name === user.appname))){
            result = applications.find( app => app.name === user.appname && app.bu === user.bu)
            index = applications.indexOf(result)

            if(user.bu === applications[index].bu){
                console.log(index, "same")
                children = applications[index].children[0].children
                if(children == undefined) { children = [] }
                children.push(user);
				
				console.log(children, "children")
				
				data = applications[index].children
				
				console.log(data[children])
				
				//applications[index].children.children.push(children)
				//data.children = children
				
            } else {
                console.log(index, "different")
                var children = []
                children.push(user);
                applications[index].children = children
            }

        }
    }



    var children = []

    

    for(i=0;i<associateddevices.length;i++){

        var device = associateddevices[i]
        if(applications.find( app => (app.name === device.appname))){
            result = applications.find( app => app.name === device.appname)
            index = applications.indexOf(result)

            if(device.bu === applications[index].bu){
                console.log(index, "same")
                children = applications[index].children[1].children
                if(children == undefined) { children = [] }
                children.push(device);
				
				console.log(children, "devices")
				
				data = applications[index].children
				
				console.log(data[children])
				
				//applications[index].children.children.push(children)
				//data.children = children
				
            } else {
                console.log(index, "different")
                var children = []
                children.push(device);
                applications[index].children = children
            }

        }

    }

    children = []


    

    children = []

    console.log(business_units, 'businessunits')

    for(i=0;i<applications.length;i++){
        var application = applications[i]

        //console.log(application, "qwerty")

        if(business_units.find( bu => bu.name === application.bu)){
            result = business_units.find( bu => bu.name === application.bu)
            index = business_units.indexOf(result)

            if(application.bu === business_units[index].name){
                console.log(index, "same")

                children = business_units[index].children

                if(children == undefined) { children = [] }

                children.push(application);
                business_units[index].children = children

            } else {
                console.log(index, "different")
                var children = []
                children.push(application);
                business_units[index].children = children
            }
        }
    }

    makeList('result', business_units);

    /*   */




    var updateOutput = function (e) {
        //  console.log(e);
        var list = e.length ? e : $(e.target)
        console.log(list);

        if (list[0].classList[1] === 'dd-source') {
            source_Array = list.nestable('serialize');
            console.log(source_Array);
        }
        if (list[0].classList[1] === 'dd-target') {
            destination_Array = list.nestable('serialize');
            console.log(destination_Array);
        }
        if (list[0].classList[2] === 'dd-source1') {
            main_source_Array = list.nestable('serialize');
            console.log(main_source_Array);
        }
        if (list[0].classList[2] === 'dd-target1') {
            main_destination_Array = list.nestable('serialize');
            console.log(main_destination_Array);
        }
    };

    // activate Nestable for list 1
    $('#nestable').nestable({
            group: 1, maxDepth: 7, data: 0
        })
        .on('change', function(e){
			
			
			
			var list = e.length ? e : $(e.target)
			var leftentities = list.nestable('serialize');

			for(i=0;i<leftentities.length;i++){
				
				var entity = leftentities[i];

				if('children' in entity){
					
					var key = "children";
					
					var data = entity[key]
					
					delete entity[key]; 
					
					leftentities.push(data[0])
					
				}
			}
			
			source_Array = 	leftentities	

			localStorage.setItem('source', JSON.stringify(source_Array));
			makeList('dd-source', source_Array);			
			
		});

    // activate Nestable for list 2
    $('#nestable2').nestable({
            group: 1, maxDepth: 7, role: 0
        })
        .on('change', updateOutput);

    $('#nestable3').nestable({
            group: 0, maxDepth: 5
        })
        .on('change', function(e){

			var list = e.length ? e : $(e.target)
			var leftentities = list.nestable('serialize');
			
			console.log(leftentities)
			
			for(i=0; i<leftentities.length; i++){
				
				bu_entity = leftentities[i]
				
				console.log(bu_entity)
				
				if(bu_entity.value == 'B'){
					
					console.log(bu_entity, 'bu entity')
					
				} else {
					
					//alert('wrong move')
					
				}
			}

		});

    // activate Nestable for list 2
    $('#nestable4').nestable({
            group: 1, maxDepth: 5
        })
        .on('change', function(e){
			console.log("Sdasdsddad")
		});

    // updateOutput($('#nestable3').data('output', $('#nestable-output')));
    // updateOutput($('#nestable4').data('output', $('#nestable2-output')));


	//new event
	
	var nestableId = document.getElementById('nestable');

        nestableId.addEventListener('mousemove', function (e) {
            e.preventDefault();
		});
		

    $('#save-list').on('click', function (e) {
		
		var allowSave = false

		for(i=0;i<destination_Array.length;i++){
			var entity = destination_Array[i];
			
			if(entity.value == 'B'){
				
				if('children' in entity){
					
					var child = entity.children
					
					for(j=0;j<child.length;j++){
						
						if(child[j].value!='A'){
							
							allowSave = false

						} else {
							
							var childlevel2 = child[j]
							
							if('children' in childlevel2){
								
								var child2 = childlevel2.children
								
								for(k=0;k<child2.length;k++){
									
									if(child2[k].value=='D' || child2[k].value == 'O' || child2[k].value == 'U'){
										
										allowSave = true
										
									} else {
										
										allowSave = false
										
									}
									
								}
								
							}
							
						}
						
					}
				
				} else {
					
					allowSave = true

				}
				
			} else {
			
				allowSave = false
				
			}
			
		}
		
		if(allowSave == false){
			
			alert("Invalid Association!")
			
		} else {
			
					$('.result_mas').addClass('dis_blk');
					console.log(destination_Array, 'save-list');
					console.log(main_source_Array, 'main_source_Array');
					makeList('result', destination_Array);
										
					$("#entity").modal('hide');			
			
		}
		


    });

    $('#save-item').on('click', function (e) {
         
        console.log(dbdata, 'save-Item');
        console.log(dbdata, 'dbdata');
        makeList('result2', dbdata);


    });


    $('#save-Mainlist').on('click', function (e) {

        makeList('resultMain', main_destination_Array);
		
		//localStorage.setItem('finalresult', JSON.stringify(main_destination_Array));
		
		
        console.log(main_source_Array, '------------------->');


    })

    $('#nestable-menu').on('click', function (e) {
        var target = $(e.target),
            action = target.data('action');
        if (action === 'expand-all') {
            $('.dd').nestable('expandAll');
        }
        if (action === 'collapse-all') {
            $('.dd').nestable('collapseAll');
        }
    });


    // $('#nestable3').nestable();
	
	//makeList('result', []);


    if (typeof (Storage) !== "undefined") {

        var addNewNode = document.getElementById('addNewNode');
		

        addNewNode.addEventListener('click', function (e) {
			
			
            e.preventDefault();
			
			if(input.value == ''){
				alert("Please enter valid input")
			} else {
	            let newObj = {};
				newObj.name = input.value;
				newObj.value = type.value;
				newObj.id = source_Array.length + 1;

				source_Array.push(newObj);
				localStorage.setItem('source', JSON.stringify(source_Array));

				makeList('dd-source', source_Array);
				//makeList('dd-source1', source_Array);
				input.value = "";
				type.value = "B";			
				
			}
        });
		


        addIndividual_Item.addEventListener('click', function (e) {
            e.preventDefault();

            let newObj = {};
            newObj.name = $('#individual_item').val();
            newObj.id = dbdata.length + 1;

            dbdata.push(newObj);
            localStorage.setItem('dbdata', JSON.stringify(dbdata));

            makeList('dd-target1', dbdata);
            //makeList('dd-source1', source_Array);
            input.value = "";
        });

        createOlLi(source_Array);
        createOlLi(dbdata);
        

        makeList('dd-source', source_Array);
        makeList('dd-target', destination_Array);      
        makeList('dd-target1', dbdata);   

    } else {
        alert(' Sorry! No Web Storage support..');
    }

    function makeList(domId, data) {
        console.log(domId, data)
        let domName = document.getElementsByClassName(domId);
        let dd = createOlLi(data, 1);
        domName[0].innerHTML = "";
        domName[0].appendChild(dd);
    }

    function createOlLi(lists, index) {
        if (lists.length) {
            var ol = document.createElement("ol");
            ol.className = "dd-list";
            ol.setAttribute("id", 'Indivi_item_scroll');
            for (let i = 0; i < lists.length; i++) {
                var li = document.createElement("li");
                li.className = "dd-item";
                li.setAttribute("data-name", lists[i].name);
                li.setAttribute("data-id", lists[i].id);
				li.setAttribute("data-value", lists[i].value);
				
				let j = 0;
				
				if(lists[i].value == 'B') { 
					var value = 'Business Unit'
					j = 0
				} else if(lists[i].value == 'A') { 
					var value = 'Application'
					j = 1
				} else if(lists[i].value == 'D') { 
					var value = 'Device'
					j = 2
				} else if(lists[i].value == 'U'){ 
					var value = 'Users'
					j = 3
				} else {
					var value = 'Others'
					j = 4					
				}
				
                var div = document.createElement("div");
                div.className = "dd-handle";
                div.innerHTML = "<span class='typetext'>"+ value +"</span><br/>"+ lists[i].name;
                //div.innerHTML = lists[i].id;

                li.appendChild(div);
                li.innerHTML += "<i class='fa fa-ellipsis-v ellip_Icon_Align' onclick='rgtPullOver("+j+")'></i><i class='fa fa-trash-o fa-lg ellip_Icon_Align' onclick='mani("+i+")' id='delete'></i> ";
                if (lists[i].children) {
                    li.appendChild(createOlLi(lists[i].children, i + index + 1));
                    ol.appendChild(li);
                } else {
                    ol.appendChild(li);
                }
            }
            return ol;
        } else {
            let div = document.createElement('div');
            div.className = "dd-empty"
            return div;
        }
    }
	
	mani = (value) => {
		source_Array.splice(value, 1)
		console.log(source_Array)
		localStorage.setItem('source', JSON.stringify(source_Array));
		makeList('dd-source', source_Array);
	}
	
	rgtPullOver = (value) => {
		
		$('#rgtPullOver').addClass('in');
		$('#rgtPullOver').attr('data-toggle','collapse');
		$('#rgtPullOver').attr('aria-expanded', true)
				
		if(value == 0) {
			makeList('dd-target1', bu_Array)
		} else if(value == 1) {
			makeList('dd-target1', app_Array)			
		} else if(value == 2) {
			makeList('dd-target1', [])
		} else if(value == 3) {
			makeList('dd-target1', users_Array)
		} else {
			makeList('dd-target1', [])
		}

		
	}
	
	$('#close').on('click', function (e) {
		$('#rgtPullOver').removeClass('in');
	})
	
    pullOverTemplate = function () {
        //$('#nestable4').removeClass('dis_none');
        var targetDiv = document.getElementById('nestable4');
        var pullTemplateMas = document.createElement('div');
        targetDiv.appendChild(pullTemplateMas);
        $('#nestable4').addClass('dis_blk');
        console.log('hi Pull');
        return targetDiv;

    }

});

	
