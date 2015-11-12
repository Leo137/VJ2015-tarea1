BasicGame.Gameover = function(){ }; 

BasicGame.Gameover = function(){ }; 

BasicGame.Gameover.prototype = { 
preload: function() {
	this.menuBackground = new MenuBackground(game,0,0,game.width,game.height,'bg_pattern_color');
},
loadUpdate: function(){
	this.menuBackground.updateBackground();
},
create: function() {

},
update: function() {
	this.menuBackground.updateBackground();

}
}

