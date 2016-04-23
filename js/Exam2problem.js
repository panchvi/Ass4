function MenuChoice() {
    
    if (document.getElementById("menu").value == "cat_list") {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
		document.getElementById("section3").style.visibility = "hidden";
		document.getElementById("section4").style.visibility = "hidden";
		document.getElementById("section5").style.visibility = "hidden";
		Get_All_Categories();
    }
    
    else if (document.getElementById("menu").value == "create_cat") {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
		document.getElementById("section3").style.visibility = "hidden";
		document.getElementById("section4").style.visibility = "hidden";
		document.getElementById("section5").style.visibility = "hidden";
    }
    
    else if (document.getElementById("menu").value == "edit_cat") {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
		document.getElementById("section3").style.visibility = "visible";
		document.getElementById("section4").style.visibility = "hidden";
		document.getElementById("section5").style.visibility = "hidden";
    }
	else if (document.getElementById("menu").value == "del_cat") {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
		document.getElementById("section3").style.visibility = "hidden";
		document.getElementById("section4").style.visibility = "visible";
		document.getElementById("section5").style.visibility = "hidden";
    }
	else if (document.getElementById("menu").value == "about") {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
		document.getElementById("section3").style.visibility = "hidden";
		document.getElementById("section4").style.visibility = "hidden";
		document.getElementById("section5").style.visibility = "visible";
    }
	else {
		document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
		document.getElementById("section3").style.visibility = "hidden";
		document.getElementById("section4").style.visibility = "hidden";
		document.getElementById("section5").style.visibility = "hidden";
	}
}

function Get_All_Categories() {
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
	
	//Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";

    //Checks that the object has returned data
	objRequest.onreadystatechange = function() {
        if (objRequest.readyState == 4 && objRequest.status == 200) {
            var output = JSON.parse(objRequest.responseText);
			
			var count = 0;
			var categories_table = "<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";  //Create a table header
			
			for (count = 0; count < output.GetAllCategoriesResult.length; count++) {
				categories_table += "<tr><td>" + output.GetAllCategoriesResult[count].CID 
				+ "</td><td>" + output.GetAllCategoriesResult[count].CName + "</td><td>" 
				+ output.GetAllCategoriesResult[count].CDescription + "</td></tr>"
			}
			
			categories_table += "</table>";
			
			document.getElementById("cat_list_table").innerHTML = categories_table;
	
        }
}
    
	//Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function CreateCategory()
{
	var objRequest = new XMLHttpRequest();
	var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
	
	//Collect Category data from web page
	var CategoryName = document.getElementById("c_name").value;
	var CategoryDes = document.getElementById("c_des").value;
	
	//Create the parameter string
	var new_category = '{"CName":"' + CategoryName +'","CDescription":"' + CategoryDes +'"}';
	
	//Checking for AJAx operation return
	objRequest.onreadystatechange = function() {
		if (objRequest.readyState == 4 && objRequest.status == 200) {
			var output = JSON.parse(objRequest.responseText);
			if (output.WasSuccessful == 1)	{
				document.getElementById("result").innerHTML = "The operation was successful!"
			}
			else {
				document.getElementById("result").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
			}
		}
	}

	//Start AJAX request
	objRequest.open("POST", url, true);
	objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	objRequest.send(new_category);
}

function UpdateCatDescription() {
	var objRequest = new XMLHttpRequest();
	var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
	
	//Collect Customer data from web page
	var cid = document.getElementById("c_id").value;
	var cdes = document.getElementById("c_desc").value;
	
	//Create the parameter string
	var edit_cat_des = '{"CDescription":"' + cdes + '", "CID":"' + cid + '"}';
	
	//Checking for AJAx operation return
	objRequest.onreadystatechange = function() {
		if (objRequest.readyState == 4 && objRequest.status == 200) {
			var result = JSON.parse(objRequest.responseText);
			Operation_two_Result(result);
		}
	}

	//Start AJAX request
	objRequest.open("POST", url, true);
	objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	objRequest.send(edit_cat_des);
}

function Operation_two_Result(output) {
	if (output.WasSuccessful == 1)	{
		document.getElementById("result_two").innerHTML = "The operation was successful!"
	}
	else if (output.WasSuccessful == 0) {
		document.getElementById("result_two").innerHTML = "Operation failed with an unspecified error!"
	}
	else if (output.WasSuccessful == -2) {
		document.getElementById("result_two").innerHTML = "Operation failed because the data string supplied could not be deserialized into the service object!"
	}
	else if (output.WasSuccessful == -3) {
		document.getElementById("result_two").innerHTML = "Operation failed because a record with the supplied Order ID could not be found!"
	}
	else {
		document.getElementById("result_two").innerHTML = "The operation was not successful!"
	}
}


function DeleteCategory()
{	
	var del_confirm = confirm("Do you really want to delete this category?");
	
	if (del_confirm == true) {
	
		var objRequest = new XMLHttpRequest();
		var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
		url += document.getElementById("cat_id_del").value;
		
		//Checking for AJAX operation return
		objRequest.onreadystatechange = function() {
			if (objRequest.readyState == 4 && objRequest.status == 200) {
				var output = JSON.parse(objRequest.responseText);
				if (output.DeleteCategoryResult.WasSuccessful == 1)	{
					document.getElementById("result_thr").innerHTML = "The operation was successful!"
				}
				else {
					document.getElementById("result_thr").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
				}
			}
		}

		//Start AJAX request
		objRequest.open("GET", url, true);
		objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		objRequest.send();
	}
	else {
		document.getElementById("result_thr").innerHTML = "The operation was stopped from happening!"
	}
}