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

    if (timeLeft > 0){
        this.gameoverText = game.add.text(game.width/2, game.height/2, 'HAZ LOGRADO ESCAPAR DE LOS GATOS!', { font: "bold 34px Arial", fill: "#ff0044" });
    }
    else{
        this.gameoverText = game.add.text(game.width/2, game.height/2, 'GAME OVER!!', { font: "bold 34px Arial", fill: "#ff0044" });
    }
    this.gameoverText.anchor.set(0.5);
    this.gameoverText.stroke =  'black';
    this.gameoverText.strokeThickness=2;

    this.gameoverText.inputEnabled = true;

    this.goToMenuText = game.add.text(game.width/2, game.height/2 + game.height/3, 'Click aquí para regresar', { font: "bold 34px Arial", fill: "#FFFFFF" });

    this.goToMenuText.anchor.set(0.5);
    this.goToMenuText.stroke =  'black';
    this.goToMenuText.strokeThickness=2;

    this.goToMenuText.inputEnabled = true;
    this.goToMenuText.events.onInputDown.add(this.toPreMenu, this);

},
update: function() {
	this.menuBackground.updateBackground();

},

toPreMenu: function(levelNumber,tutorial){
		timeLeft = 300 * 1000;
        fx.play('button_click');
        game.state.start('PreMenu');
    },
}

