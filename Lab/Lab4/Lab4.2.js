	/*
	Brian Warfield
	CIS 12 PHP
	1 Oct 2014
	Purpose: Lab Codecademy JavaScript Lesson 8: Dragon Slater
	*/
var slaying = true;
var youHit = Math.floor(Math.random() * 2);
var damageThisRound = Math.floor(Math.random()) * 5 + 1;
var totalDamage = damageThisRound;
while(slaying){
    if(youHit){
        console.log("You hit the dragon for "+damageThisRound+" points!");
        totalDamage += damageThisRound;
        if (totalDamage >= 4){
            console.log("The dragon is dead. Like really dead. Like O. M. G. dead!");
            slaying = false;
        }
    }else{
    console.log("You got burned to dead.");
    slaying = false;
    }
}