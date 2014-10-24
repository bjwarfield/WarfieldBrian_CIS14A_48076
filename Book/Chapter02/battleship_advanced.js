//Battleship Advanced
var game; //board object
var reset = function() {
	var grid = []; //array for table coordinate status
	var draw_board = "<table>";
	for (var row = 0; row < 11; row++) { //for 11 rows
		grid[row] = []; //make an inner array
		draw_board += "<tr>"; //start a new table row and give it an ID#
		for (var col = 0; col < 11; col++) { //for 11 columns in each row
			grid[row][col] = 0; //initialize its array coordinates to 0 
			if (row === 0) { //if its the first row
				if (col === 0) { //if its the first column in the first row
					draw_board += "<td class='row_" + String(row) + " col_" + String(col) + "'><span>&nbsp;</span></td>"; //give cell col ID# and blank cell value
				} else { //if its the first row and not the first column
					draw_board += "<td class='row_" + String(row) + " col_" + String(col) + "'><span>" + String(col) + "</span></td>"; ////give cell col ID# and col# cell value
				}

			} else { //if not the first row
				if (col === 0) { //if its the first column
					draw_board += "<td class='row_" + String(row) + " col_" + String(col) + "'><span>"; //give cell col ID# and...
					switch (row) {
						case 1:
							draw_board += "A";
							break; //give row header cell value
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
	this.grid = grid; //map table array
	console.log(this.grid); //debugung

	function ship(shipSize) {
		this.isSunk = false;
		this.isVertical = false;
		this.shipSize = shipSize;
		this.position = [
			[0, 0, false]
		]; //X coor, y coor, isHit?
	}

	this.carrier = new ship(5);
	console.log(this.carrier);
	this.battleship = new ship(4);
	this.submarine = new ship(3);
	this.destroyer = new ship(3);
	this.patrol_boat = new ship(2);
}

function setPos(setGrid) {

	var rand_row;
	var rand_col;
	var set;
	var verify;

	function gridCheck(gc, rr, rc, ss, iv) { //(gridCheck, rand_row, rand_col, shipSize,isVertical
		var loop;
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

	for (var property in setGrid) {
		if (typeof setGrid[property] === Object) {
			do {
				setGrid[property].isVertical=Math.random()>=0.5;
				if (setGrid[property].isVertical) {
					//generate random coodinates to place ship
					rand_row = Math.floor(Math.random() * 10 + 1);
					rand_col = Math.floor(Math.random() * (10 - setGrid[property].shipSize) + 1); //allow vertical space for shipSize
					verify = gridCheck(setGrid, rand_row, rand_col, setGrid[property].shipSize, setGrid[property].isVertical); //check to see if coodinates are occupied
					if (verify) {
						for (set = 0; set < setGrid[property].shipSize; set ++) {
							setGrid[rand_row][rand_col + set] = 1;
							setGrid[property].position[set] = [rand_row, rand_col + set, false];
							document.getElementsByClassName("row_" + rand_row + " col_" + rand_col + set)[0].innerHTML = "<span>1</span>";
						}
					}

				} else {
					rand_row = Math.floor(Math.random() * (10 - setGrid[property].shipSize) + 1); //allow horizontal space for shipSize
					rand_col = Math.floor(Math.random() * 10 + 1);
					verify = gridCheck(setGrid, rand_row, rand_col, setGrid[property].shipSize, setGrid[property].isVertical);
					if (verify) {
						for (set = 0; set < setGrid[property].shipSize; set ++) {
							setGrid[rand_row + set][rand_col] = 1;
							setGrid[property].position[set] = [rand_row + set, rand_col, false];
							document.getElementsByClassName("row_" + rand_row + set + " col_" + rand_col)[0].innerHTML = "<span>1</span>";
						}
					}
				}
			} while (!verify);
		}
	}
	return setGrid;
}

document.getElementById('reset').onclick = function() {
	game = new board(reset()); //reset game

	console.log(game);
	for (var quadrant in document.getElementsByClassName('grid')) {
		document.getElementsByClassName('grid')[quadrant].onclick = function() {
			console.log(this.className);
		};
	}
};