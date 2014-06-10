"use strict";
	
		var sudoku = (function(){
			var s; 
			var self; //put into higher variable scope
			return {
				settings: {
					sudoku_board : document.getElementById("sudoku_board"),
					games : [
					[
						[4, "5-h", 2, 3, "1-h", 8, 6, "7-h", 9],
						["3-h", "9-h", 1, "6-h", "7-h", 5, 4, "2-h", 8],
						[8, 7, 6, "2-h", 9, 4, 3, "1-h", 5],
						["8-h", 3, 1, 2, 4, 5, 9, "6-h", 7],
						["5-h", 6, "4-h", 9, "8-h", 7, 2, "1-h", 3],
						["7-h", "2-h", "9-h", 1, 6, 3, 5, 4, 8],
						["7-h", 9, "6-h", 1, 8, 3, 5, 2, 4],
						[8, "5-h", 2, "7-h", 4, 9, 1, 3, 6],
						["4-h", "3-h", "1-h", 6, 5, 2, 9, "8-h", 7]
					],
					[
						["2-h",8,6,7,"1-h","4-h",9,3,5],
						[9,4,5,6,3,2,"7-h","8-h","1-h"],
						[1,7,"3-h","9-h","5-h",8,4,2,6],
						[4,2,"7-h","6-h","5-h",8,1,9,"3-h"],
						["3-h","5-h","6-h",1,9,7,"4-h","2-h","8-h"],
						["8-h",1,9,3,"4-h","2-h","7-h",6,5],
						[3,6,1,5,"4-h","2-h","8-h",7,9],
						["5-h","7-h","9-h",8,1,3,2,6,4],
						[2,8,4,"6-h","9-h",7,5,3,"1-h"]
					]
					],
					regions : {},
					currentGame: -1
				},

				init: function() {
					s = this.settings; //settings
					self = sudoku; //this object
					this.bindUIActions();
				},

				bindUIActions: function() {
					document.addEventListener('DOMContentLoaded', function(){
						self.drawTable();
						self.startNew();
						console.log(s);
					});
					document.getElementById('sudoku_board').addEventListener('change',function(e){
						e.srcElement.value = self.validateEntry(e.srcElement.value);
						if (e.srcElement.value != "" || e.srcElement.defaultValue){
							//only mark if data actually entered
							self.markEntry(e.srcElement);
							var finished = self.checkFinished();
							if (finished == true){
								var time = controls.stopTimer();
								lightbox.showOverlay("\
								<h2>Congratulations</h2><p>You have completed the game<p><p>You took " + time + " minutes to finish </p><a id='lightbox_action_new' class='button'>Play Again?</a>");
							}
							else if (finished == 'incorrect'){
								alert('You have made a mistake somewhere.');
							}
						}
					});
				},
				
				startNew: function(){
					controls.restartTimer(); //restart the timer;
					var diff = false;
					while (diff == false){
						var key = Math.floor(Math.random() * s.games.length);
						if (key != s.currentGame){
							diff = true;
						}
					}
					s.currentGame = key;
					self.enterBoard(s.games[key])
				},
				
				restartGame: function(){
					controls.restartTimer(); //restart the timer;
					self.enterBoard(s.games[s.currentGame])
				},
				
				checkFinished: function(){
					var inputs = s.sudoku_board.getElementsByTagName('input');
					var finished = true; //overwrite with false if one is not.
					var correct = true; //as above
					
					for (var i = 0; i < inputs.length; i++){
						if (inputs[i].disabled == true){
							//ignore the given values
						}
						else{
							if (inputs[i].value == ""){
								//not filled in
								finished = false;
							}
							else{
								//filled in
							}
						}
					}
					
					if (finished != true){
						console.log('not_finished');
						return false;
					}
					else{
						//now mark each entry...
						
						for (var i = 0; i < inputs.length; i++){
							if (inputs[i].disabled == true){
								//ignore the given values
							}
							else{
								var elem = inputs[i];
								var parent = elem.parentNode;
								var id = parent.id;
								console.log(parent);
								var array = s.regions[id[0]][id[1]];
								if (array.value == elem.value){
									//entry correct
								}
								else{
									var correct = false;
								}
							}
						}
						
						if (correct == true){
							return true;
						}
						else{
							return 'incorrect';
						}
						
					}
					
				},
				
				markEntry: function(elem){
					//see if entry is correct
					var parent = elem.parentNode;
					var id = parent.id;
					var array = s.regions[id[0]][id[1]];
					if (array.value == elem.value){
						elem.style.background = 'white';
						console.log('correct');
					}
					else{
						elem.style.background = 'rgb(255, 137, 137)';
						console.log('false');
					}
				},
				
				enterBoard: function(game){
					//notice the 1-based index, as that's what my objects use
					for (var i = 0; i < game.length; i++){
						for (var j = 0; j < game[i].length; j++){
							
							var raw = game[i][j].toString();//the raw stored data
							var value = raw[0]; //the box's value
							if (raw.length != 1){
								var visible = true;
							}
							else{
								var visible = false;
							}
							
							//console.log(game[i][j]);
							s.regions[i][j].value = value;
							s.regions[i][j].visible = visible;
							if (visible){
								s.regions[i][j].reference.getElementsByTagName('input')[0].style.removeProperty('background');
								s.regions[i][j].reference.getElementsByTagName('input')[0].value = value;
								s.regions[i][j].reference.getElementsByTagName('input')[0].disabled = true;
							}
							else{
								s.regions[i][j].reference.getElementsByTagName('input')[0].value = '';
								s.regions[i][j].reference.getElementsByTagName('input')[0].style.removeProperty('background'); //so the background is reset when method used for  restarting
								s.regions[i][j].reference.getElementsByTagName('input')[0].disabled = false;
							}
						}
					}
				},
				
				validateEntry: function(data){
					//check that the data entered is numerical and 1 character in length. Do not match against awnser at this stage
					if (!isNaN(data)){
						if (data == null || data == ""){
							return null;
						}
						//is a number
						data = Math.round(data);
						if (data.toString().length != 1){
							data = data.toString()[0];
							Number(data); //get first character from number, returned as number data-type
						}
						return data;
					}
					else{
						return null;
					}
					
				},
				
				drawTable: function(){
					console.log('load');
					var box = new Array();
					
					//create the table
					var table = document.createElement('table');
					table.id = 'sudoku_table';
					s.sudoku_board.appendChild(table);

					for (var x = 0; x<3; x++){
						//create the outer row
						var row = document.createElement('tr'); 
						table.appendChild(row);
						box[x] = row;

						for (var y = 0; y<3; y++){
							//create the outer cell
							var cell = document.createElement('td'); 
							row.appendChild(cell);
							box[x][y] = cell;
							
						}
					}
					
					var index = -1; //-1 so we start on a 0-based index in a moment
					for (var i = 0; i<3; i++){
						for (var j = 0; j<3; j++){
							index++; //used for row naming
							s.regions[index] = {};
							var cell_no = -1; //used for inner naming
							
							//inner grids
							var table = document.createElement('table');
							box[i][j].appendChild(table);
							
							
							for (var x = 0; x<3; x++){
								//create the outer row
								var row = document.createElement('tr'); 
								table.appendChild(row);
								

								for (var y = 0; y<3; y++){
									cell_no++
									//create the outer cell
									var cell = document.createElement('td'); 
									row.appendChild(cell);
									
									//console.log(index + "" + cell_no);
									
									s.regions[index][cell_no] = {};
									s.regions[index][cell_no].reference = cell ;
									s.regions[index][cell_no].reference.innerHTML = "<input></input>";
									s.regions[index][cell_no].reference.id = index + "" + cell_no;
								
									
								}
							}
					
						}
					}
					

				}

			};
		})();