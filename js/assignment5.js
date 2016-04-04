function MenuChoice() {
    
    if (document.getElementById("menu").value == "cust_list") {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
		document.getElementById("section3").style.visibility = "hidden";
        Get_All_Customers();
    }
    
    else if (document.getElementById("menu").value == "order_names") {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
		document.getElementById("section3").style.visibility = "hidden";
    }
    
    else if (document.getElementById("menu").value == "order_history") {
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



function Get_All_Customers() {
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
	
	//Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/GetAllCustomers";

    //Checks that the object has returned data
	objRequest.onreadystatechange = function() {
        if (objRequest.readyState == 4 && objRequest.status == 200) {
            var output = JSON.parse(objRequest.responseText);
            //Generate_Customers(output);
			
			var count = 1;
			var customers_table = "<table><tr><th>S.No.</th><th>Customer ID</th><th>Customer Name</th><th>City</th></tr>";  //Create a table header
			
			for (count = 1; count <= (output.GetAllCustomersResult.length); count++) {
				customers_table += "<tr><td>" + count + "</td><td>" + output.GetAllCustomersResult[count-1].CustomerID 
				+ "</td><td>" + output.GetAllCustomersResult[count-1].CompanyName + "</td><td>" 
				+ output.GetAllCustomersResult[count-1].City + "</td></tr>"
			}
			
			customers_table += "</table>";
			
			document.getElementById("cust_table").innerHTML = customers_table;
	
        }
}
    
	//Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function Get_Customer_Order_History_Table() {
    var objRequest = new XMLHttpRequest();
    
	var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += document.getElementById("cust_id").value;

    objRequest.onreadystatechange = function() {
        if (objRequest.readyState == 4 && objRequest.status == 200) {
            var output = JSON.parse(objRequest.responseText);
			
			var count = 1;
			var customer_order_history_table = "<table><tr><th>S.No.</th><th>Product Name</th><th>Quantity Ordered</th></tr>";
			
			for (count = 1; count <= output.length; count++) {
				customer_order_history_table += "<tr><td>" + count + "</td><td>" + output[count-1].ProductName + "</td><td>" +
				output[count-1].Total + "</td></tr>"
			}
			
			customer_order_history_table += "</table>";
			document.getElementById("cust_order_hist_table").innerHTML = customer_order_history_table;
        }
    }
    
    objRequest.open("GET", url, true);
    objRequest.send();
}

function Get_Customer_Full_Order_History_Table() {
    var objRequest = new XMLHttpRequest();
    
	var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += document.getElementById("customer_id").value;

    objRequest.onreadystatechange = function() {
        if (objRequest.readyState == 4 && objRequest.status == 200) {
            var result = JSON.parse(objRequest.responseText);
			
			var count = 0;
			var customer_full_order_history_table = "<table><tr><th>S.No.</th><th>Order Date</th><th>Order ID</th><th>Ship Address</th><th>Ship City</th><th>Ship Name</th><th>Ship Postcode</th><th>Shipped Date</th></tr>";
			
			for (count = 0; count < result.GetOrdersForCustomerResult.length; count++) {
				customer_full_order_history_table += "<tr><td>" +(count+1)+ "</td><td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" +
				result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" +
				result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td></tr>"
			}
			
			customer_full_order_history_table += "</table>";
			document.getElementById("cust_full_order_hist_table").innerHTML = customer_full_order_history_table;
        }
    }
    
    objRequest.open("GET", url, true);
    objRequest.send();
}