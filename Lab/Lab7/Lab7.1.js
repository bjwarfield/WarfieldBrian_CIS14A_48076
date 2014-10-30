	/*
	Brian Warfield
	CIS 12 PHP
	29 Oct 2014
	Purpose: Lab Codecademy JavaScript Lesson 12: Introduction to objects
	*/
	function Circle (radius) {
    this.radius = radius;
    this.area = function () {
        return Math.PI * this.radius * this.radius;
        
    };
    // define a perimeter method here
    this.perimeter = function(){
      return 2 * Math.PI * this.radius;  
    };
};

