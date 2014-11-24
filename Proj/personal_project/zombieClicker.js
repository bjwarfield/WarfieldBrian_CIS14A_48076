//zombieClicker v0.2

//initialize Data
resource = function(name){
	this.name = name;
	this.total = 0;
	this.increment = 1;
	this.specialchance = 0.1;
};
var food = new resource("food");
var lumber = new resource("lumber");
var tools = new resource("tools");
var firstaid = new resource("firstaid");
var metal = new resource("metal");
var munitions = new resource("munitions");

leanto = {
	total:0,
	require:{
		food:0,
		lumber:2,
		tools:0,
		firstaid:0,
		metal:0,
		munitions:0,
	}
};
campsite = {
	total:0,
	require:{
		food:0,
		lumber:0,
		tools:0,
		firstaid:0,
		metal:0,
		munitions:0,
	}
};
garrisson = {
	total:0,
	require:{
		food:0,
		lumber:0,
		tools:0,
		firstaid:0,
		metal:0,
		munitions:0,
	}
};
settlement = {
	total:0,
	require:{
		food:0,
		lumber:0,
		tools:0,
		firstaid:0,
		metal:0,
		munitions:0,
	}
};
colony = {
	total:0,
	require:{
		food:0,
		lumber:0,
		tools:0,
		firstaid:0,
		metal:0,
		munitions:0,
	}
};
warehouse = {
	total:0,
	require:{
		food:0,
		lumber:0,
		tools:0,
		firstaid:0,
		metal:0,
		munitions:0,
	}
};
silo = {
	total:0,
	require:{
		food:0,
		lumber:0,
		tools:0,
		firstaid:0,
		metal:0,
		munitions:0,
	}
};
depot = {
	total:0,
	require:{
		food:0,
		lumber:0,
		tools:0,
		firstaid:0,
		metal:0,
		munitions:0,
	}
};
infirmary = {
	total:0,
	require:{
		food:0,
		lumber:0,
		tools:0,
		firstaid:0,
		metal:0,
		munitions:0,
	}
};
workshop = {
	total:0,
	require:{
		food:0,
		lumber:0,
		tools:0,
		firstaid:0,
		metal:0,
		munitions:0,
	}
};
barracks = {
	total:0,
	require:{
		food:0,
		lumber:0,
		tools:0,
		firstaid:0,
		metal:0,
		munitions:0,
	}
};


var zombies = {
	count:0,
	rate:0.1,
},
stronghold = {
	strength:50,
	increment:1,
},
fight = {
	str:1,
},
fortify={
	efficiency:1,
},
forage={
	efficiency:1,
};

resourceClicks = 0;
isLockdown = 0;

population = {
	current:0,
	max:10,
	survivors:0,
	foragers:0,
	fighters:0,
	fortifiers:0,
	medic:0,
	mechanic:0,
	militant:0,
	
};
var clock = 0;//Game timer
var tod = "Night";//time of day
var spawnDelay=0;//delay timer for zombie spawns
window.onload = function(){
	setTimeout(start, 5000);
};
function start(){
	setInterval(play, 1000);
	console.log("Game Starting");
	document.getElementById("lockdown").childNodes[0].innerHTML = "Lockdown!!!";
	document.getElementById("lockdown").childNodes[0].onclick = lockdown();
	

}


function play(){
	//iterate and set the clock
	clock += 5;//5min intervals
	setClock(clock);

	//Zombies attack Barrier
	if (stronghold.strength >= zombies.count){
		stronghold.strength -= zombies.count;
		document.getElementById("stronghold_strength").innerHTML =stronghold.strength;
	}else{
		stronghold.strength = 0;
	}
	
	//determine how often to spawn zombies based on time of day
	spawnDelay++;
	diceRoll = Math.random();
	if (tod == "Night"){
		if(spawnDelay>6){//30 game min
			//console.log('NightCheck');
			if(diceRoll<0.25){//25% chance of zombies
				spawnDelay=0;
				spawnZombies();
			}
		}
	}else if(tod == "Dawn"){
		if(spawnDelay>9){//45 game min
			if(diceRoll<0.25){
				spawnDelay=0;
				spawnZombies();
			}
		}
	}else if(tod == "Day"){
		if(spawnDelay>12){//60 game min
			if(diceRoll<0.25){
				spawnDelay=0;
				spawnZombies();
			}
		}
	}else{//dusk
		if(spawnDelay>9){//30 game min
			if(diceRoll<0.25){
				spawnDelay=0;
				spawnZombies();
			}
		}
	}
	

	
	document.getElementById("num_zombies").innerHTML =Math.floor(zombies.count);
	document.getElementById("stronghold_strength").innerHTML =stronghold.strength;
	document.getElementsByClassName('food')[0].children[1].innerHTML = food.total;
	document.getElementsByClassName('lumber')[0].children[1].innerHTML = lumber.total;
	document.getElementsByClassName('tools')[0].children[1].innerHTML= tools.total;
	console.log(zombies.count);
}

 function lockdown (){

}
function find (){
	resourceClicks++;
	//console.log("scavange!");
	var x = Math.random();
	var y = Math.random();
	var supply = '';
	if(x<0.2){
		supply = tools;
	}else if(x>=0.2 && x<0.4){
		supply = food;
	}else{
		supply = lumber;
	}
	supply.total+=supply.increment*forage.efficiency;
	document.getElementsByClassName(supply.name)[0].children[1].innerHTML= supply.total;

}

function kill (){
	if(zombies.count >= fight.str){
		zombies.count -= fight.str;
	}else{
		zombies.count = 0;
	}
	//console.log("bas");
	document.getElementById("num_zombies").innerHTML =Math.floor(zombies.count);
}
function build(){
	if(lumber.total >0){
		lumber.total--;
		stronghold.strength += stronghold.increment * fortify.efficiency;	
	}
	
	document.getElementById("stronghold_strength").innerHTML =stronghold.strength;
	//console.log("build");
}
function spawnZombies(){
	mob = Math.round((Math.random()*2+3)*(population.current+1));//3-5 Zombies per person
	console.log("mob: "+mob);
	zombies.count += mob;
}
function setClock (time){
	var mins = time%60;
	var hours = Math.floor(time%1440/60);
	var days = Math.floor(time/1440);
	document.getElementById("minutes").innerHTML = mins;
	document.getElementById("hours").innerHTML = hours;
	document.getElementById("days").innerHTML = days;
	if(hours<5 || hours >= 19){
		tod = "Night";
	}else if(hours >= 5 && hours < 7){
		tod = "Dawn";
	}else if(hours>=7 && hours < 17){
		tod = "Day";
	}else{
		tod	= "Dusk";
	}
	document.getElementById("daytracker").innerHTML = tod;
}

