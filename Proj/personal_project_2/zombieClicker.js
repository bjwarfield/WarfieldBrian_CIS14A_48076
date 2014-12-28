//zombieClicker v0.3
//JSON String Checker

//cookie functions
function IsJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

function createCookie(name, value, days) {
	var expires = "";
	//if days set, create new expiry date variable equal to value in function call
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}

	//write cookie
	document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
}

//DOM aliases
$ID = document.getElementById.bind(document);
$Class = document.getElementsByClassName.bind(document);
$Tag = document.getElementsByTagName.bind(document);

//zeropad numbers
Number.prototype.pad = function(size) {
      var s = String(this);
      while (s.length < (size || 2)) {s = "0" + s;}
      return s;
};

//return true if object is empty
function isEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key))
			return false;
	}
	return true;
}

//reads cookie and return its value
function getCookie(name) {
	var cname = name + "=";
	//split cookies into cookie arary
	var ca = document.cookie.split(';');
	//cycle through all cookies in array
	for (var i = 0; i < ca.length; i++) {
		//create variable for current cookie
		var c = ca[i];
		//remove leading spaces
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		//if cokie name = name on function call, return substring containing cookie value
		if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
	}
	//return null if cookie not found
	return null;
}


//delete a cookie
function eraseCookie(name) {
	//call create cookie with blank value and negative expiry
	createCookie(name, "", -1);
}

//reset the game
function resetGame() {

	//initialize Data
	food = {
			name: "food",
			total: 0,
			increment: 1,
			specialchance: 0.1,
		},
		lumber = {
			name: "lumber",
			total: 0,
			increment: 1,
			specialchance: 0.1
		},
		tools = {
			name: "tools",
			total: 0,
			increment: 1,
			specialchance: 0.1
		},
		firstaid = {
			name: "firstaid",
			total: 0,
			increment: 1,
		},
		metal = {
			name: "metal",
			total: 0,
			increment: 1,
		},
		munitions = {
			name: "munitions",
			total: 0,
			increment: 1,
		},
		territory = 1000,
		totalBuildings = 0,
		leanto = {
			total: 0,
			require: {
				food: 0,
				lumber: 5,
				tools: 0,
				firstaid: 0,
				metal: 0,
				munitions: 0,
			}
		},
		campsite = {
			total: 0,
			require: {
				food: 0,
				lumber: 20,
				tools: 0,
				firstaid: 0,
				metal: 5,
				munitions: 0,
			}
		},
		garrisson = {
			total: 0,
			require: {
				food: 0,
				lumber: 0,
				tools: 0,
				firstaid: 0,
				metal: 0,
				munitions: 0,
			}
		},
		settlement = {
			total: 0,
			require: {
				food: 0,
				lumber: 0,
				tools: 0,
				firstaid: 0,
				metal: 0,
				munitions: 0,
			}
		},
		colony = {
			total: 0,
			require: {
				food: 0,
				lumber: 0,
				tools: 0,
				firstaid: 0,
				metal: 0,
				munitions: 0,
			}
		},
		warehouse = {
			total: 0,
			require: {
				food: 0,
				lumber: 0,
				tools: 0,
				firstaid: 0,
				metal: 0,
				munitions: 0,
			}
		},
		silo = {
			total: 0,
			require: {
				food: 0,
				lumber: 0,
				tools: 0,
				firstaid: 0,
				metal: 0,
				munitions: 0,
			}
		},
		depot = {
			total: 0,
			require: {
				food: 0,
				lumber: 0,
				tools: 0,
				firstaid: 0,
				metal: 0,
				munitions: 0,
			}
		},
		infirmary = {
			total: 0,
			require: {
				food: 0,
				lumber: 0,
				tools: 0,
				firstaid: 0,
				metal: 0,
				munitions: 0,
			}
		},
		workshop = {
			total: 0,
			require: {
				food: 0,
				lumber: 0,
				tools: 0,
				firstaid: 0,
				metal: 0,
				munitions: 0,
			}
		},
		barracks = {
			total: 0,
			require: {
				food: 0,
				lumber: 0,
				tools: 0,
				firstaid: 0,
				metal: 0,
				munitions: 0,
			}
		},
		graveyard = {
			total: 0,
			require: {
				food: 0,
				lumber: 0,
				tools: 0,
				firstaid: 0,
				metal: 0,
				munitions: 0,
			}
		},
		stronghold = {
			strength: 50,
			max: 100,
			dmgReduction:1,
		},
		fight = {
			str: 1,
		},
		fortify = {
			efficiency: 1,
		},
		forage = {
			efficiency: 1,
			special:1,
		},
		stats={
			resourceClicks : 0,
			actionClicks : 0,
			zombieKills : 0,
			
		},
		isLockdown = false,
		clock = 0,
		spawnDelay = 0,
		population = {
			zombies: 0,
			current: 0,
			max: 10,
			unemployed:0,
			survivors: 0,
			foragers: 0,
			fighters: 0,
			fortifiers: 0,
			medic: 0,
			mechanic: 0,
			militant: 0,
		};
}

var clock = 0; //Game timer
var tod = "Night"; //time of day
var spawnDelay = 0; //delay timer for zombie spawns


window.onload = function(){
		$ID("lockdown_button").disabled = true;
		$ID("forage_button").disabled = true;
		$ID("fight_button").disabled = true;
		$ID("fortify_button").disabled = true;
		$ID("start_button").disabled = false;
};
function start() {
	gameID = setInterval(play, 1000);
	resetGame();
	console.log("Game Starting");
	$ID("lockdown_button").disabled = false;
	$ID("forage_button").disabled = false;
	$ID("fight_button").disabled = false;
	$ID("fortify_button").disabled = false;
	$ID("start_button").disabled = true;
}


function play() {
	//iterate and set the clock
	clock += 5; //5 game-minute intervals
	setClock(clock);

	//Zombies attack Barrier
	if (stronghold.strength >= population.zombies*stronghold.dmgReduction) {
		stronghold.strength -= population.zombies*stronghold.dmgReduction;
		if(Math.floor(population.zombies*stronghold.dmgReduction)>1)gamelog("Zombies do "+Math.floor(population.zombies*stronghold.dmgReduction)+" damage to your stronghold");
		$ID("stronghold_strength").innerHTML = stronghold.strength + "/" + stronghold.max;
	} else {
		stronghold.strength = 0;
	}

	//determine how often to spawn zombies based on time of day
	spawnDelay++;
	diceRoll = Math.random();
	if (convertTime(clock).hours < 23 && convertTime(clock).hours >= 13) {//night
		if (spawnDelay > 3) { //30 game min
			//console.log('NightCheck');
			if (diceRoll < 0.25) { //25% chance of zombies
				spawnDelay = 0;
				spawnZombies();
			}
		}
	} else if (convertTime(clock).hours >= 23 || convertTime(clock).hours < 1) {//dawn
		if (spawnDelay > 9) { //45 game min
			if (diceRoll < 0.25) {
				spawnDelay = 0;
				spawnZombies();
			}
		}
	} else if (convertTime(clock).hours >= 1 && convertTime(clock).hours < 11) {//day
		if (spawnDelay > 12) { //60 game min
			if (diceRoll < 0.25) {
				spawnDelay = 0;
				spawnZombies();
			}
		}
	} else { //dusk
		if (spawnDelay > 9) { //30 game min
			if (diceRoll < 0.25) {
				spawnDelay = 0;
				spawnZombies();
			}
		}
	}


	//output displays
	updateDisplays();
	updateBuildingButtons();
	//game over
	if (stronghold.strength < 1 && population.current <= 0) {//losing conditions
		clearInterval(gameID);//stop the loop
		$ID("lockdown_button").disabled = true;//reset the buttons
		$ID("forage_button").disabled = true;
		$ID("fight_button").disabled = true;
		$ID("fortify_button").disabled = true;
		$ID("start_button").disabled = false;
		var deathStats = '';
		deathStats +='<p>Resource Clicks: '+stats.resourceClicks+'</p>';
		deathStats +='<p>Action Clicks: '+stats.actionClicks+'</p>';
		deathStats +='<p>Zombies Killed: '+stats.zombieKills+'</p>';
		deathStats +='<p>Time Survived: '+convertTime(clock).days+' Days '+convertTime(clock).hours+' Hours '+convertTime(clock).mins+' Minutes</p>';
		$ID("overlay").getElementsByTagName("span")[0].innerHTML=deathStats;
		overlay();
	}
}

//output displays
function updateDisplays(){
	$ID("num_zombies").innerHTML = Math.floor(population.zombies);
	$ID("stronghold_strength").innerHTML = Math.floor(stronghold.strength) + "/" + Math.floor(stronghold.max);
	$Class('food_count')[0].innerHTML =Math.floor(food.total);
	$Class('lumber_count')[0].innerHTML = Math.floor(lumber.total);
	$Class('tools_count')[0].innerHTML = Math.floor(tools.total);
	$Class('firstaid_count')[0].innerHTML =Math.floor(firstaid.total);
	$Class('metal_count')[0].innerHTML = Math.floor(metal.total);
	$Class('munitions_count')[0].innerHTML = Math.floor(munitions.total);

	$Class('rclicks_count')[0].innerHTML= stats.resourceClicks;
	$Class('aclicks_count')[0].innerHTML= stats.actionClicks;
	$Class('zkills_count')[0].innerHTML= stats.zombieKills;

	totalBuildings = leanto.total + campsite.total;

	$Class('buildings_count')[0].innerHTML = totalBuildings;
	$Class('territory_count')[0].innerHTML = territory;

	$Class('pop_count')[0].innerHTML = population.current;
	$Class('maxpop_count')[0].innerHTML = population.max;

}

//locdowm mode
function lockdown() {
	if(!isLockdown){
		isLockdown = true;
		$ID("forage_button").disabled = true;//disable foraging
		$ID("lockdown_button").disabled = true;
		$ID("lockdown_button").innerHTML = "End Lockdown";
		setTimeout(function(){$ID("lockdown_button").disabled = false;},15000);//disable button for 30secs
		fight.str = fight.str *2;//double fight strength
		stronghold.dmgReduction = 0.5;
	} else{
		$ID("forage_button").disabled = false;//enagle foraging
		$ID("lockdown_button").disabled = true;
		$ID("lockdown_button").innerHTML = "Lockdown!!!";
		setTimeout(function(){$ID("lockdown_button").disabled = false;},15000);//disable button for 30secs
		fight.str = fight.str /2;//reset fight.str
		stronghold.dmgReduction = 1;//reset strongohold dmg reduction
		if(fight.str<1)fight.str =1;
	}
	console.log("Lockdown: "+isLockdown);
}

//scavenge for resources
function find() {
	stats.resourceClicks++;
	//console.log("scavange!");
	var x = Math.random();
	var y = Math.random();
	var supply;
	var bonus;
	if (x < 0.2) {
		supply = tools;
		bonus = munitions;
	} else if (x >= 0.2 && x < 0.4) {
		supply = food;
		bonus = firstaid;
	} else {
		supply = lumber;
		bonus = metal;
	}
	supply.total += supply.increment * forage.efficiency;
	
	if (y < supply.specialchance){
		bonus.total += bonus.increment * forage.special;
	}
	updateDisplays();	
}


//kill zombies
function kill() {
	if (population.zombies >= fight.str) {
		population.zombies -= fight.str;
		gamelog("Killed "+Math.floor(fight.str)+" Zombies");
		stats.zombieKills += fight.str;
		stats.actionClicks++;

	} else if(population.zombies > 0){
		stats.zombieKills += population.zombies;
		gamelog("Killed "+Math.floor(population.zombies)+" Zombies");
		population.zombies = 0;
		stats.actionClicks++;
	}
	updateDisplays();
}

//fortify your stronghold
function build() {
	if (lumber.total > fortify.efficiency) {
		if (stronghold.strength + fortify.efficiency < stronghold.max){
			lumber.total-= fortify.efficiency;
			stronghold.strength += fortify.efficiency;
			stats.actionClicks++;
		}else if(stronghold.strength < stronghold.max){
			lumber.total-= (stronghold.max -stronghold.strength);
			stronghold.strength = stronghold.max;
			stats.actionClicks++;
		}
	}
	updateDisplays();
}

// pop zombies
function spawnZombies() {
	mob = Math.round((Math.random() * 2 + 3) * (population.current + 1)); //3-5 Zombies per person
	gamelog(mob+" Zombies Appeared");
	population.zombies += mob;
}
function convertTime(time){
	var mins = time % 60;
	var hours = Math.floor(time % 1440 / 60);
	var days = Math.floor(time / 1440);

	var clock = (hours<=6?hours+6+":"+mins.pad(2)+" AM":(hours>6 && hours<=18?hours-6+":"+mins.pad(2)+" PM":(hours>18? hours-18+":"+mins.pad(2)+" AM":"")));
	return {days:days, hours:hours, mins:mins.pad(2), clock:clock};
}
//clock display function
function setClock(time) {
	$ID("minutes").innerHTML = convertTime(time).mins;
	$ID("hours").innerHTML = convertTime(time).hours;
	$ID("days").innerHTML = convertTime(time).days;
	if (convertTime(time).hours < 23 && convertTime(time).hours >= 13) {
		tod = "<p>"+convertTime(time).clock+"</p><p>Night</p>";
	} else if (convertTime(time).hours >= 23 || convertTime(time).hours < 1) {
		tod = "<p>"+convertTime(time).clock+"</p><p>Dawn</p>";
	} else if (convertTime(time).hours >= 1 && convertTime(time).hours < 11) {
		tod = "<p>"+convertTime(time).clock+"</p><p>Day</p>";
	} else {
		tod = "<p>"+convertTime(time).clock+"</p><p>Dusk</p>";
	}
	$ID("daytracker").innerHTML = tod;
}

//toggle overlay
function overlay() {
	el = $ID("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}
function createBuilding(building, num){
	//check resourse requirements
	if (food.total >= (building.require.food * num) && lumber.total >= (building.require.lumber * num) && tools.total >= (building.require.tools * num) && firstaid.total >= (building.require.firstaid * num) && metal.total >= (building.require.metal * num) && munitions.total >= (building.require.munitions * num)){
		//deduct from resources
		food.total -= (building.require.food * num);
		lumber.total -= (building.require.lumber * num);
		tools.total -= (building.require.tools * num);
		firstaid.total -= (building.require.firstaid * num);
		metal.total -= (building.require.metal * num);
		munitions.total -= (building.require.munitions * num);
		building.total += num;
		updateDisplays();

	}
}
function updateBuildingRow(building,name){
	for(var i=0;i<=2;i++){
		var num = Math.pow(10,i);
		if (food.total >= (building.require.food * num) && lumber.total >= (building.require.lumber * num) && tools.total >= (building.require.tools * num) && firstaid.total >= (building.require.firstaid * num) && metal.total >= (building.require.metal * num) && munitions.total >= (building.require.munitions * num)){
			$Class(name)[0].getElementsByClassName('build_'+num)[0].disabled=false;
		}else{
			$Class(name)[0].getElementsByClassName('build_'+num)[0].disabled=true;
		}
		
	}
	$Class(name)[0].getElementsByClassName("buildtally")[0].innerHTML=building.total;

}
function updateBuildingButtons(){
	updateBuildingRow(leanto,"leanto");
	updateBuildingRow(campsite,"campsite");
}
function updatePopulation(){
	population.max = leanto.total + (campsite.total *5);
}

//rescue a refugee
function rescue(amount){
	//calculate rescue cost
	var totalCost = calcCost(amount);
	//chech resources
	if(food.total >= totalCost && population.current + amount <= population.max){
		population.current += amount;
		population.unemployed += amount;
		food.total -= totalCost;
	}
	updateDisplays();

}

//calculate the cost to rescue a refugee
function calcCost(amount){
	var aggCost = 0,
		currentPrice = 0,
		popCurrentTemp = population.current;
	//Then iterate through adding fugees, and increment temporary values
	for (var i=0; i<amount; i++){
			currentPrice = 10 + Math.floor(popCurrentTemp / 100); 
			aggCost += currentPrice;
			popCurrentTemp += 1;
	}
	// return the aggregated cost to the function that called this one.
	return aggCost;
}
function gamelog(log){
	//get timestamp
	var time = '';
	var logRepeat = Number($ID("logR").innerHTML.replace(/\D/g,''));
	var d = new Date();
	time = d.getHours().pad(2)+":"+d.getMinutes().pad(2);
	if ($ID('logL').innerHTML == log){
		logRepeat += 1;
		$ID('log0').innerHTML = '<span id="logT" class="cell">' + time + '</span><span id="logL" class="cell">' + log + '</span><span id="logR" class="cell">(x' + logRepeat + ')</span>';
	}else{
		//set counter to 1
		logRepeat = 1;
		//
		$ID("log9").innerHTML = $ID("log8").innerHTML; 
		$ID("log8").innerHTML = $ID("log7").innerHTML; 
		$ID("log7").innerHTML = $ID("log6").innerHTML; 
		$ID("log6").innerHTML = $ID("log5").innerHTML; 
		$ID("log5").innerHTML = $ID("log4").innerHTML; 
		$ID("log4").innerHTML = $ID("log3").innerHTML; 
		$ID("log3").innerHTML = $ID("log2").innerHTML; 
		$ID("log2").innerHTML = $ID("log1").innerHTML; 
		//extract infor from log0 w/o ID names
 		$ID('log1').innerHTML = '<span  class="cell">' + $ID('logT').innerHTML + '</span><span class="cell">' + $ID('logL').innerHTML + '</span><span class="cell">' + $ID('logR').innerHTML + '</span>';
			//creates new contents with new time, message, and x1
			$ID('log0').innerHTML = '<span id="logT" class="cell">' + time + '</span><span id="logL" class="cell">' + log + '</span><span id="logR" class="cell">(x' + logRepeat + ')</span>';
	}
}