//Declare and initialize variables
var hours;// hours worked in hrs
var payRate;//$'s per hour
var doubleTime;//hour at which double time starts
var tripleTime;//hour at which triple time starts
var payGross;//Declare not initialize
var payNet;
var doubleTimeHours;//Declare not initialize
var tripleTimeHours;//Declare not initialize
var taxRate;
var taxNet;
var hour; //incrementer
var tableRows = "";//Text to be inserted
var hourArray;
var payRateArray;
var payCheckArray=[];

function calculateCheck(input) {
	//get values from form
	hours = Number(input["hours"]);
	payRate = Number(input["payRate"]);
	taxRate = Number(input["taxRate"]);
	doubleTime = Number(input["doubleTime"]);
	tripleTime = Number(input["tripleTime"]);
	//initialize arrays
	payCheckArray[0] = [];//hours
	payCheckArray[1] = [];//pay rate
	payCheckArray[2] = [];//gross pay
	payCheckArray[3] = [];//net tax
	payCheckArray[4] = [];//net pay
	//Initialize table data with header
	tableRows = "<table><thead><th>Hours</th><th>Pay Rate</th><th>Gross Pay</th><th>Taxes at "+taxRate+"%</th><th>Net Pay</th></thead>";
	tableRows += "<tbody>";//start Table Body

	for (hour=0;hour<=hours;hour++){
		//determine Paycheck
		payCheckArray[0][hour]= hour;

		doubleTimeHours = hour - doubleTime;
		tripleTimeHours = hour - tripleTime;
		if (hour<=doubleTime){//straight time
			payCheckArray[2][hour] = hour*payRate;//calculate gross pay
			payCheckArray[1][hour]=payRate;
			payCheckArray[3][hour] = payCheckArray[2][hour]*taxRate/100;//calculate taxes
			payCheckArray[4][hour] = payCheckArray[2][hour] - payCheckArray[3][hour];//net pay
		}else if(hour<=tripleTime){//double time but not triple time
			payCheckArray[2][hour] = (hour*payRate)+(doubleTimeHours*payRate);//calculate pay
			payCheckArray[1][hour] = payRate*2;//overtime payrate
			payCheckArray[3][hour] = payCheckArray[2][hour]*taxRate/100;//calculate taxes
			payCheckArray[4][hour] = payCheckArray[2][hour] - payCheckArray[3][hour];//net pay
		}else{//triple time
			payCheckArray[2][hour] =(hour*payRate)+(doubleTimeHours*payRate)+(tripleTimeHours*payRate);//calculate pay
			payCheckArray[1][hour] = payRate*3;//overtime payrate
			payCheckArray[3][hour] = payCheckArray[2][hour]*taxRate/100;//calculate taxes
			payCheckArray[4][hour] = payCheckArray[2][hour] - payCheckArray[3][hour];//net pay
		};//end If
	};//end For Loop
	//append array data in table format
	for (row=0;row<payCheckArray[0].length;row++){
		tableRows += "<tr>";
		for(cols=0;cols<payCheckArray.length;cols++){
			if(cols==0){
				tableRows+= "<td>"+payCheckArray[cols][row]+"</td>";
			}else{
				tableRows+= "<td>"+toMoney(payCheckArray[cols][row])+"</td>";
			}//end if-else
		}//end col loop
		tableRows += "</tr>";
	}//end row
	tableRows += "</tbody>";//end table body
	document.getElementById("payCheckOutput").innerHTML = tableRows;
	};//endFunction
	function toMoney (money){//takes a number a returns a string in USD format ie: "$10,001.50"
	return Intl.NumberFormat("en-US",{ style: "currency", currency: "USD" }).format(money);
	}//endFunction

//receive inouts via GET url
function getForm(url){
	var info=url.split("?");
	var nameValuePairs=info[1].split("&");
	var $_GET = new Object;
	for(var i=0;i<nameValuePairs.length-1;i++){
		var map=nameValuePairs[i].split("=");
		var name=map[0];
		var value=Number(map[1]);
		$_GET[name]=value;
	}
	return $_GET;
}
//validate form inputs
function validateInput(get){
	return get['hours'] != "" && get['payRate'] != "" && get['taxRate'] != "" && get['doubleTime'] != "" && get['tripleTime'] != "";
}
function stickyInputs(get){
	document.getElementById("timecard")[0].value = get['hours'];
	document.getElementById("timecard")[1].value = get['payRate'];
	document.getElementById("timecard")[2].value = get['taxRate'];
	document.getElementById("timecard")[3].value = get['doubleTime'];
	document.getElementById("timecard")[4].value = get['tripleTime'];
}