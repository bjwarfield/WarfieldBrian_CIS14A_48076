//Battleship Advanced
var reset = function() {
		var grid = []; //array for table coordinate status
		var draw_board = "<table>";
		for (var row = 0; row < 11; row++) { //for 11 rows
			grid[row] = []; //make an inner array
			draw_board += "<tr>"; //start a new table row and give it an ID#
			for (var col = 0; col < 11; col++) { //for 11 columns in each row
				grid[row][col] = 0; //initialize its array coordinates to 0 
				if (row == 0) { //if its the first row
					if (col == 0) { //if its the first column in the first row
						draw_board += "<td class='row_" + String(row) + " col_" + String(col) + "'><span>&nbsp;</span></td>"; //give cell col ID# and blank cell value
					} else { //if its the first row and not the first column
						draw_board += "<td class='row_" + String(row) + " col_" + String(col) + "'><span>" + String(col) + "</span></td>"; ////give cell col ID# and col# cell value
					}

				} else { //if not the first row
					if (col == 0) { //if its the first column
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
						draw_board += "<td class='row_" + String(row) + " col_" + String(col) + " grid'><span>" + String(grid[row][col]) + "</span></td>";
					}
				}



			}
			draw_board += "</tr>";
		};
		draw_board += "</table>"
		document.getElementById('board').innerHTML = draw_board; //draw new table to board
		return grid;
	} //end reset function

document.getElementById('reset').onclick = function() {
	var board = new Object();
	board.grid = reset();
	for (var quadrant in document.getElementsByClassName('grid')) {
		document.getElementsByClassName('grid')[quadrant].onclick = function() {
			console.log(this.className)
		}
	}
}