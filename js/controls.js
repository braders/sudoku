"use strict";
	
		var controls = (function(){
			var s;  //the settings
			var self; //put into higher variable scope
			return {
				settings: {
					sudoku_board : document.getElementById("sudoku_board"),
					start_time : false
				},

				init: function() {
					s = this.settings; //settings
					self = controls; //this object
					this.bindUIActions();
				},

				bindUIActions: function() {
					document.addEventListener('DOMContentLoaded', function(){
						self.drawControls();//needs to run before we assign the event listeners
					});
					s.sudoku_board.addEventListener('click', function(e){
						//this is set up before we have created the controls, so we need to rely on event bubbling
						var id = e.srcElement.id;

						//first, has the timer started.
						if (s.start_time == false){
							//s.date = new Date();
							self.startTimer();
						}
						
						if (id == 'restart'){
							sudoku.restartGame();
						}
						if (id == 'new_game'){
							sudoku.startNew();
						}
					});
					
				},
				
				restartTimer: function(){
					self.stopTimer();
					s.start_time = false;
					if (document.getElementById('timer')){
						document.getElementById('timer').innerHTML = "00:00.0";
					};
				},
				
				startTimer: function(){
					s.start_time = Date.now();
					s.timer = window.setInterval(self.updateTimer, 100);
					
				},
				
				msToTime: function(duration){
					/* from https://coderwall.com/p/wkdefg */
					var milliseconds = parseInt((duration%1000)/100)
						, seconds = parseInt((duration/1000)%60)
						, minutes = parseInt((duration/(1000*60))%60)
						, hours = parseInt((duration/(1000*60*60))%24);

					hours = (hours < 10) ? "0" + hours : hours;
					minutes = (minutes < 10) ? "0" + minutes : minutes;
					seconds = (seconds < 10) ? "0" + seconds : seconds;

					return minutes + ":" + seconds + "." + milliseconds;
				},
				
				updateTimer: function() {
					document.getElementById('timer').innerHTML = self.msToTime(Date.now() - s.start_time);
				},
				
				stopTimer: function() {
					s.final_time = Date.now() - s.start_time;
					window.clearInterval(s.timer);
					return self.msToTime(s.final_time);
				},
				
				drawControls: function() {
					var container = document.createElement('div');
					//restart button
					var restart = document.createElement('a');
					restart.id = 'restart';
					restart.innerText = "Restart"
					container.appendChild(restart);
					
					//new button
					var new_game = document.createElement('a');
					new_game.id = 'new_game';
					new_game.innerText = "New Game"
					container.appendChild(new_game);
					
					//awnser
					/*var answer = document.createElement('a');
					answer.id = 'answer';
					answer.innerText = "Answer"
					container.appendChild(answer);*/
					
					//timer
					var timer = document.createElement('p');
					timer.id = 'timer';
					timer.innerText = "00:00:0"
					container.appendChild(timer);
					
					//append to screen				
					s.sudoku_board.appendChild(container);
				}
				

			};
		})();