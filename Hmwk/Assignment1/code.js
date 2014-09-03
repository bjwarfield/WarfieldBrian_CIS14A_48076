/*
Brian Warfield
CIS 14A JavaScript
2 September 2014
Purpose: Assignment 1.3B Linking JS Code pp. 33 
*/
var word = "bottles"; 
var count = 99; //How many bottles
function pluralCheck(howMany){//fix the plural form if only 1 bottle
	if (howMany == 1){	
		return "bottle";
	}else{
		return "bottles";
	};
};
while (count > 0) {
	word = pluralCheck(count);
	console.log(count + " " + word + " of non-alcoholic beverages on the wall");//It's a joke, I don't care much for beer.
	console.log(count + " " + word + " of non-alcoholic beverages,");
	console.log("Take one down, pass it around,");
	count = count - 1;//Literally take one
	word = pluralCheck(count);//recheck plural form
	if (count > 0) {//check to see if end of the song had been reached
		console.log(count + " " + word + " of non-alcoholic beverages on the wall.");
	} else {
		console.log("No more " + word + " of non-alcoholic beverages on the wall.");
		break;//redundant loop exit after 0 bottles reached
	};
};