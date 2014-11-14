	/*
	Brian Warfield
	CIS 14A Javascript
	05 Nov 2014
	Purpose: Lab Codecademy JavaScript Lesson 15: Introduction to Objects II
	*/
	function StudentReport() {
		var grade1 = 4;
		var grade2 = 2;
		var grade3 = 1;
		this.getGPA = function() {
			return (grade1 + grade2 + grade3) / 3;
		};
	}

	var myStudentReport = new StudentReport();

	for (var x in myStudentReport) {
		if (typeof myStudentReport[x] !== "function") {
			console.log("Muahaha! " + myStudentReport[x]);
		}
	}

	console.log("Your overall GPA is " + myStudentReport.getGPA());