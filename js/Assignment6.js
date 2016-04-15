function MenuChoice() {
    
    if (document.getElementById("menu").value == "add_cust") {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
		document.getElementById("section3").style.visibility = "hidden";
    }
    
    else if (document.getElementById("menu").value == "edit_cust") {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
		document.getElementById("section3").style.visibility = "hidden";
    }
    
    else if (document.getElementById("menu").value == "del_cust") {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
		document.getElementById("section3").style.visibility = "visible";
    }
	else {
		document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
		document.getElementById("section3").style.visibility = "hidden";
	}
}

function CreateCustomer()
{
	var objRequest = new XMLHttpRequest();
	var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
	
	//Collect Customer data from web page
	var custid = document.getElementById("cust_id").value;
	var custname = document.getElementById("cust_name").value;
	var custcity = document.getElementById("cust_city").value;
	
	//Create the parameter string
	var newcustomer = '{"City":"' + custcity +'","CustomerID":"' + custid + '","CompanyName":"' + custname +'"}';
	
	//Checking for AJAx operation return
	objRequest.onreadystatechange = function() {
		if (objRequest.readyState == 4 && objRequest.status == 200) {
			var result = JSON.parse(objRequest.responseText);
			if (result.WasSuccessful == 1)	{
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
	objRequest.send(newcustomer);
}

function UpdateOrderAddress() {
	var objRequest = new XMLHttpRequest();
	var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
	
	//Collect Customer data from web page
	var orderid = document.getElementById("order_id_edit").value;
	var custname = document.getElementById("cust_name_edit").value;
	var custcity = document.getElementById("cust_city_edit").value;
	var custpin = document.getElementById("cust_pin_edit").value;
	var custadd = document.getElementById("cust_add_edit").value;
	
	//Create the parameter string
	var editadd = '{"OrderID":"' + orderid + '", "ShipName":"' + custname + '", "ShipAddress":"' + custadd + '", "ShipCity":"'  +custcity  +'", "ShipPostcode":"' + custpin + '"}';
	
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
	objRequest.send(editadd);
}

function Operation_two_Result(output) {
	if (output.WasSuccessful == 1)	{
		document.getElementById("result_two").innerHTML = "The operation was successful!"
	}
	else {
		document.getElementById("result_two").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
	}
}

function DeleteCustomer()
{	
	var del_confirm = confirm("Do you really want to delete this customer?");
	
	if (del_confirm == true) {
	
		var objRequest = new XMLHttpRequest();
		var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
		url += document.getElementById("cust_id_del").value;
		
		//Checking for AJAX operation return
		objRequest.onreadystatechange = function() {
			if (objRequest.readyState == 4 && objRequest.status == 200) {
				var result = JSON.parse(objRequest.responseText);
				if (result.DeleteCustomerResult.WasSuccessful == 1)	{
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