	/*
	Brian Warfield
	CIS 12 PHP
	DATE
	Purpose: Lab Codecademy JavaScript Lesson 6: Search text for your name
	*/
/*jshint multistr:true */
var text = "bacon bacon bacon bacon Bee-Jay bacon bacon bacon bacon bacon bacon bacon Bee-Jay  bacon Bee-Jay  bacon bacon bacon bacon Bee-Jay Bee-Jay bacon bacon Bee-Jay";
var myName = "Bee-Jay";
var hits = [];

for (var i=0; i < text.length; i++){
    if (text[i] == myName [0]){
        for(var j = 0; j < i + myName.length; j++){
            hits.push(text[i]);
        }
    }
}
if (hits == []){
    console.log("Your name wasn't found!");
}else{
    console.log(hits);
}