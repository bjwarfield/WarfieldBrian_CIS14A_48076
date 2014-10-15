	/*
	Brian Warfield
	CIS 12 PHP
	8 Oct 2014
	Purpose: Lab Codecademy JavaScript Lesson 10: Choose your own adventure: 2
	*/
var user = prompt("Where is the rebel base?").toLowerCase();
switch (user){
    case "alderon":
        var ans1 = prompt("Are you sure?").toLowerCase();
        var ans2 = prompt("Are you lying to me?").toLowerCase();
        if (ans1 === "yes" && ans2 !== "no"){
            console.log("We will see");
        }else{
            console.log("Not acceptable!");
        }
        break;
    case "tatooine":
        var ans1 = prompt("Are you sure?").toLowerCase();
        var ans2 = prompt("Are you lying to me?").toLowerCase();
        if (ans1 === "yes" || ans2 !== "no"){
            console.log("We will see");
        }else{
            console.log("Not acceptable!");
        }
        break;
    case "endor":
        var ans1 = prompt("Are you sure?").toLowerCase();
        var ans2 = prompt("Are you lying to me?").toLowerCase();
        if (ans1 === "yes" || ans2 !== "no"){
            console.log("We will see");
        }else{
            console.log("Not acceptable!");
        }
        break;
    default:
        console.log("You Lie!");
        break;
        
}
