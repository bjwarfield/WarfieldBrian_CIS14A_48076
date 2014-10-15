	/*
	Brian Warfield
	CIS 12 PHP
	15 Oct 2014
	Purpose: Lab Codecademy JavaScript Lesson 12: Contact List
	*/
var friends = {};
friends.bill = {
    firstName: "Bill",
    lastName: "Gates",
    number: "555-555-0001",
    address: ['One Microsoft Way','Redmond','WA','98052']
};
friends.steve = {
    firstName: "Steve",
    lastName: "Jobs",
    number: "555-555-0002",
    address: ['One iRoad','Silicoln Valley','CA','90252']
};
friends.tony = {
    firstName: "Tony",
    lastName: "Tha'Tumor",
    number: "555-555-0003",
    address: ['114 Dat Way','Bogota','NJ','10358']
};
var list = function(){
  for (j in friends){
    console.log(friends[j]);
  }  
}
var search = function(name){
    for(var i in friends){
        if(friends[i].firstName === name ){
           console.log(friends[i]);
           return friends[i];
          }
       }
    };
