"use strict";
	
		var lightbox = (function(){
			var s;  //the settings
			var self; //put into higher variable scope
			return {
				settings: {
					lightbox: document.getElementById('lightbox'),
					content: document.getElementById('lightbox_content'),
					startMessage: "\
						<h2 class='intro__title'>Sudoku</h2><p>Welcome to this exciting game of sudoku.</p><p>Your time will start when you click on the game board for the first time.</p><p>Any wrong moves will be highlighed in red.</p><a id='lightbox_action_close' class='button'>Start Game</a><p class='intro__credit'>Created by <a href='http://brad-taylor.co.uk'>Bradley Taylor</a></p>\
					"
				},

				init: function() {
					s = this.settings; //settings
					self = lightbox; //this object
					this.bindUIActions();
				},

				bindUIActions: function() {
					document.addEventListener('DOMContentLoaded', function(){
						self.showOverlay(s.startMessage);
						
					});
					s.content.addEventListener('click', function(e){
						//links generated and deleted, so may not exist to directly assign event to
						var id = e.srcElement.id;
						
						if (id == 'lightbox_action_close'){
							self.hideOverlay();
						}
						if (id == 'lightbox_action_new'){
							sudoku.startNew();
							self.hideOverlay();
						}
					});
				},
				
				showOverlay: function(content) {
					s.content.innerHTML = content;
					s.lightbox.style.display = 'block';
				},
				
				hideOverlay: function(){
					s.lightbox.style.display = 'none';
				}
				
				
				

			};
		})();