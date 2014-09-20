	/*
	Brian Warfield
	CIS 12 PHP
	DATE
	Purpose: Lab Codecademy JavaScript Lesson 3: Introduction to Functions
	*/
// Write your function below. 
// Don't forget to call your function!

var sleepCheck = function (numHours){
    if (numHours >= 8){
        return "You're getting plenty of sleep! Maybe even too much!";
    }
    else{
        return "Get some more shut eye!";
    }
};
sleepCheck(10);
sleepCheck(5);
sleepCheck(8);