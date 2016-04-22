function MenuChoice() {
    
    if (document.getElementById("menu").value == "emp_list") {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
		document.getElementById("section3").style.visibility = "hidden";
		document.getElementById("section4").style.visibility = "hidden";
		document.getElementById("section5").style.visibility = "hidden";
		Get_All_Employees();
    }
    
    else if (document.getElementById("menu").value == "add_emp") {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
		document.getElementById("section3").style.visibility = "hidden";
		document.getElementById("section4").style.visibility = "hidden";
		document.getElementById("section5").style.visibility = "hidden";
    }
    
    else if (document.getElementById("menu").value == "edit_emp") {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
		document.getElementById("section3").style.visibility = "visible";
		document.getElementById("section4").style.visibility = "hidden";
		document.getElementById("section5").style.visibility = "hidden";
    }
	else if (document.getElementById("menu").value == "del_emp") {
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

function Get_All_Employees() {
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
	
	//Create URL and Query string
    var url = "http://student.business.uab.edu/webappservice/service1.svc/getAllEmployees";

    //Checks that the object has returned data
	objRequest.onreadystatechange = function() {
        if (objRequest.readyState == 4 && objRequest.status == 200) {
            var output = JSON.parse(objRequest.responseText);
			
			var count = 0;
			var employees_table = "<table><tr><th>Employee ID</th><th>Employee First Name</th><th>Employee Middle Name</th><th>Employee Last Name</th></tr>";  //Create a table header
			
			for (count = 0; count < output.GetAllEmployeesResult.length; count++) {
				employees_table += "<tr><td>" + output.GetAllEmployeesResult[count].EmpID 
				+ "</td><td>" + output.GetAllEmployeesResult[count].EmpFName + "</td><td>" 
				+ output.GetAllEmployeesResult[count].EmpMI + "</td><td>"
				+ output.GetAllEmployeesResult[count].EmpLName + "</td></tr>"
			}
			
			employees_table += "</table>";
			
			document.getElementById("emp_list_table").innerHTML = employees_table;
	
        }
}
    
	//Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function AddEmployee()
{
	var objRequest = new XMLHttpRequest();
	var url = "http://student.business.uab.edu/webappservice/service1.svc/addEmployee";
	
	//Collect Category data from web page
	var EmpID = document.getElementById("e_id").value;
	var EmpFName = document.getElementById("e_fn").value;
	var EmpMI = document.getElementById("e_mn").value;
	var EmpLName = document.getElementById("e_ln").value;
	
	//Create the parameter string
	var new_employee = '{"EmpFName":"' + EmpFName +'","EmpID":"' + EmpID +'","EmpLName":"' + EmpLName +'","EmpMI":"' + EmpMI +'"}';
	
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
	objRequest.send(new_employee);
}

function UpdateEmployee() {
	var objRequest = new XMLHttpRequest();
	var url = "http://student.business.uab.edu/webappservice/service1.svc/updateEmployee";
	
	//Collect Customer data from web page
	var EmpID = document.getElementById("emp_id").value;
	var EmpFName = document.getElementById("emp_fn").value;
	var EmpMI = document.getElementById("emp_mn").value;
	var EmpLName = document.getElementById("emp_ln").value;
	
	//Create the parameter string
	var edit_emp = '{"EmpFName":"' + EmpFName +'","EmpID":"' + EmpID +'","EmpLName":"' + EmpLName +'","EmpMI":"' + EmpMI +'"}';
	
	//Checking for AJAx operation return
	objRequest.onreadystatechange = function() {
		if (objRequest.readyState == 4 && objRequest.status == 200) {
			var output = JSON.parse(objRequest.responseText);
			if (output.WasSuccessful == 1)	{
				document.getElementById("result_two").innerHTML = "The operation was successful!"
			}
			else {
				document.getElementById("result_two").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
			}
		}
	}

	//Start AJAX request
	objRequest.open("POST", url, true);
	objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	objRequest.send(edit_emp);
}

function DeleteEmployee()
{	
	var del_confirm = confirm("Do you really want to delete this Employee?");
	
	if (del_confirm == true) {
	
		var objRequest = new XMLHttpRequest();
		var url = "http://student.business.uab.edu/webappservice/service1.svc/deleteEmployee/";
		url += document.getElementById("emp_id_del").value;
		
		//Checking for AJAX operation return
		objRequest.onreadystatechange = function() {
			if (objRequest.readyState == 4 && objRequest.status == 200) {
				var output = JSON.parse(objRequest.responseText);
				if (output.DeleteEmployeeResult.WasSuccessful == 1)	{
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