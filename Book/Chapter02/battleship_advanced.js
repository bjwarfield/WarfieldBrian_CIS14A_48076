/*
Brian Warfield
CIS 14a JavaScript
Date
Purpose: Book Chapter 2
*/
//Battleship Advanced
var game; //board object
//reset game values and reset board
var reset = function() {
	var grid = []; //array for table coordinate status
	var draw_board = "<table>";
	for (var row = 0; row < 11; row++) { //for 11 rows
		grid[row] = []; //make an inner array
		draw_board += "<tr>"; //start a new table row and give it an ID#
		for (var col = 0; col < 11; col++) { //for 11 columns in each row
			grid[row][col] = 0; //initialize its array coordinates to 0; 0= Unknown 1= Hit, 2= Miss
			if (row === 0) { //if its the first row
				if (col === 0) { //if its the first column in the first row
					draw_board += "<td class='row_" + String(row) + " col_" + String(col) + "'><span>&nbsp;</span></td>"; //give cell row/col class and blank cell value
				} else { //if its the first row and not the first column
					draw_board += "<td class='row_" + String(row) + " col_" + String(col) + "'><span>"; //give cell row/col class and...
					switch (col) {
						case 1:
							draw_board += "A";
							break; //give col header cell value
						case 2:
							draw_board += "B";
							break; //etc
						case 3:
							draw_board += "C";
							break;
						case 4:
							draw_board += "D";
							break;
						case 5:
							draw_board += "E";
							break;
						case 6:
							draw_board += "F";
							break;
						case 7:
							draw_board += "G";
							break;
						case 8:
							draw_board += "H";
							break;
						case 9:
							draw_board += "I";
							break;
						case 10:
							draw_board += "J";
							break;
					}
					draw_board += "</span></td>"; //close cell				
				}

			} else { //if not the first row
				if (col === 0) { //if its the first column
					draw_board += "<td class='row_" + String(row) + " col_" + String(col) + "'><span>" + String(row) + "</span></td>"; ////give cell col ID# and col# cell value
				} else {
					draw_board += "<td class='row_" + String(row) + " col_" + String(col) + " grid'><span>" + String(grid[row][col]) + "</span></td>"; //build the rest of the table 
				}
			}



		}
		draw_board += "</tr>";
	}
	draw_board += "</table>";
	document.getElementById('board').innerHTML = draw_board; //draw new table to board
	return grid;
}; //end reset function

function board(grid) { //object containing game properties
	this.grid = grid; //grid map table array
	//	console.log(this.grid); //debugung

	function ship(shipSize) {
		this.isSunk = false;
		this.isVertical = false;
		this.shipSize = shipSize;
		this.position = [
			[0, 0, false]
		]; //X coor, y coor, isHit?
	}

	this.carrier = new ship(5);
	//	console.log(this.carrier);
	this.battleship = new ship(4);
	this.submarine = new ship(3);
	this.destroyer = new ship(3);
	this.patrol_boat = new ship(2);
	this.shots = [0, 0]; //shots, hits
}

//verifu whether or not a grid space is occupied by another ship
function gridCheck(gc, rr, rc, ss, iv) { //(gridCheck, rand_row, rand_col, shipSize,isVertical
	var loop;
	//		console.log("gridCheck: ",gc,rr,rc,ss,iv);
	if (iv) { //vertical check
		for (loop = 0; loop < ss; loop++) {
			if (gc[rr][rc + loop] !== 0) {
				return false; //return false if grid coord is occupied
			}
		}
		return true; //return true if grid coords are clear
	} else { //horizontal check
		for (loop = 0; loop < ss; loop++) {
			if (gc[rr + loop][rc] !== 0) {
				return false;
			}
		}
		return true;
	}

} //end gridCheck function

//place ships in random location on the board
function setPos(setGrid) {

	var rand_row;
	var rand_col;
	var set;
	var verify;
	//console.log("Setting Ships");

	for (var property in setGrid) {//for every ship in the game
		//console.log("Looping");
		if (property !== "grid" && property !== "shots") {//exclude gridmap and shot counter properties
			do {
				setGrid[property].isVertical = Math.random() >= 0.5;//randomly orient ship
				//console.log(property+".isVertical = "+setGrid[property].isVertical);
				if (setGrid[property].isVertical) {
					//generate random coodinates to place ship
					rand_row = Math.floor(Math.random() * 10 + 1);
					rand_col = Math.floor(Math.random() * (10 - setGrid[property].shipSize) + 1); //allow vertical space for shipSize
					verify = gridCheck(setGrid.grid, rand_row, rand_col, setGrid[property].shipSize, setGrid[property].isVertical); //check to see if coodinates are occupied
					if (verify) {
						//console.log("Verify Pass");
						for (set = 0; set < setGrid[property].shipSize; set ++) {
							setGrid.grid[rand_row][rand_col + set] = 1;//mark coordinates as occupied on gridmap
							setGrid[property].position[set] = [rand_row, rand_col + set, false];//Set ship.position [x,y,isHit?]
							document.getElementsByClassName("row_" + rand_row + " col_" + (rand_col + set))[0].innerHTML = "<span>" + property + "</span>";//set table contents with ship name (hidden by CSS)
						}
					} else {
						//console.log("Verify Fail");
					}

				} else {
					rand_row = Math.floor(Math.random() * (10 - setGrid[property].shipSize) + 1); //allow horizontal space for shipSize
					rand_col = Math.floor(Math.random() * 10 + 1);
					verify = gridCheck(setGrid.grid, rand_row, rand_col, setGrid[property].shipSize, setGrid[property].isVertical);
					if (verify) {
						//						console.log("Verify Pass");
						for (set = 0; set < setGrid[property].shipSize; set ++) {
							setGrid.grid[rand_row + set][rand_col] = 1;
							setGrid[property].position[set] = [rand_row + set, rand_col, false];
							document.getElementsByClassName("row_" + (rand_row + set) + " col_" + rand_col)[0].innerHTML = "<span>" + property + "</span>";
						}
					} else {
						//console.log("Verify Fail");
					}
				}
			} while (!verify);
		}
	}
	return setGrid;
} //end setPos function

//calculate when a shot hits or misses
function fire(field, shot) { //confirm hit on guess

	var grid_x;
	var grid_y;

	function convertCol(head) {//convert y coord to header letter value
		switch (head) {
			case "1":
				return "A";
			case "2":
				return "B";
			case "3":
				return "C";
			case "4":
				return "D";
			case "5":
				return "E";
			case "6":
				return "F";
			case "7":
				return "G";
			case "8":
				return "H";
			case "9":
				return "I";
			case "10":
				return "J";
		}
	}
	var toAlert = function(text) {
		document.getElementById("alert").innerHTML = text;
	};

	//parse grid coodinated from element class string
	for (var parse in shot.split(" ")) {
		if (shot.split(" ")[parse].split("_")[0] === "row") {
			console.log("Row " + shot.split(" ")[parse].split("_")[1]);
			grid_x = shot.split(" ")[parse].split("_")[1];
		} else if (shot.split(" ")[parse].split("_")[0] === "col") {
			console.log("Col " + shot.split(" ")[parse].split("_")[1]);
			grid_y = shot.split(" ")[parse].split("_")[1];
		}
	}
	//console.log("grid_x=" + grid_x + ", grid_y=" + grid_y);
	//loop through ship elements
	for (var property in field) {
		//		console.log(property);
		if (property !== "grid" && property !== "shots") {//exclude gridmap and shot counter 
			for (var hitCheck in field[property].position) {//check each ship.position
				//console.log(field[property].position[hitCheck][0], field[property].position[hitCheck][1], field[property].position[hitCheck][2]);
				if (field[property].position[hitCheck][0] === grid_x && field[property].position[hitCheck][1] === grid_y && field[property].position[hitCheck][2]) {
					console.log("Already Hit " + property + " at row_" + grid_x + " and col_" + grid_y);

					break;
				} else if (field[property].position[hitCheck][0] === Number(grid_x) && field[property].position[hitCheck][1] === Number(grid_y) && !field[property].position[hitCheck][2]) { //if shot coordinated match and isHit is false
					field.shots[0]++; //increments shots taken
					field.shots[1]++; //increments hits
					console.log("Hit " + property + " at row_" + grid_x + " and col_" + grid_y);
					toAlert("Shot " + field.shots[0] + ": Hit ship at " + grid_x + convertCol(grid_y));
					field[property].position[hitCheck][2] = true;
					field.grid[grid_x][grid_y] = 1;
					document.getElementsByClassName("row_" + grid_x + " col_" + grid_y)[0].innerHTML = "<span>hit_" + property + "</span>";
					document.getElementsByClassName("row_" + grid_x + " col_" + grid_y)[0].classList.add("hit");

					break;
				}
			}
			if (field.grid[grid_x][grid_y] === 2) {
				//console.log("Already missed at row_" + grid_x + " and col_" + grid_y);
			} else if (field.grid[grid_x][grid_y] === 0) {
				field.shots[0]++; //increments shots taken
				console.log("Missed at row_" + grid_x + " and col_" + grid_y);
				toAlert("Shot " + field.shots[0] + ": Missed at " + grid_x + convertCol(grid_y));
				document.getElementsByClassName("row_" + grid_x + " col_" + grid_y)[0].innerHTML = "<span>miss</span>";//change html table data to reflect grid status (hidden by css)
				document.getElementsByClassName("row_" + grid_x + " col_" + grid_y)[0].classList.add("miss");//add miss class for css styling
				field.grid[grid_x][grid_y] = 2;//set gridMap to miss value

			}
			//Check to see if ship is sunk
			if (!field[property].isSunk) {
				var sink = true;
				for (var checkSunk in field[property].position) {
					if (!field[property].position[checkSunk][2]) {
						sink = false;
					}
				}
				field[property].isSunk = sink;
				if (field[property].isSunk) {
					console.log(property, "is sunk after", field.shots[0], "shots.");
					toAlert("Shot " + field.shots[0] + ": Sunk " + property + " at " + grid_x + convertCol(grid_y));

				}
			}
		}
	} //end property in field loop
	return field;
}

document.getElementById('reset').onclick = function() {
	game = new board(reset()); //reset game
	game = setPos(game); //place ships on board
	//	console.log(game);
	for (var quadrant in document.getElementsByClassName('grid')) {
		document.getElementsByClassName('grid')[quadrant].onclick = function() {
			console.log(this.className);
			game = fire(game, this.className);
		};
	}
};