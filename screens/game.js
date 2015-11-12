BasicGame.Game = function(){ }; 

BasicGame.Game.prototype = { 

loadUpdate : function(){
    if(this.pieProgressPie && this.pieProgressPie.alive){
    	this.progress = (tilecounter/tileTotalCount) * 0.20 + tileprogress * 0.20 + (game.load.progress/100.0) * 0.6;
    	if(this.progress != this.progress_prev){
    	    this.progress_prev = this.progress;
    	    pieTween = game.add.tween(this.pieProgressPie);
    	    pieTween.to({progress: (this.progress)}, 300, Phaser.Easing.Linear.None, true, 0, 0, false );
    	}
    }
	this.menuBackground.updateBackground();
},

preload: function() {
	this.menuBackground = new MenuBackground(game,0,0,game.width,game.height,'bg_pattern_color');
    this.pieProgressPie = new PieProgress(game, game.width/2,game.height/2, 16, '#909090', 0);
    game.world.add(this.pieProgressPie);

    //this.setLoadingText();
    game.time.advancedTiming = true;

    // Load things..
},
create: function() {

    // Create things...
    this.gameTestText = game.add.text(game.width/2, game.height/2 - game.height/3, "Escena de juego :p :p", { font: "bold 34px Arial", fill: "#FFFFFF" });
    this.gameTestText.anchor.set(0.5);
    this.gameTestText.stroke =  'black';
    this.gameTestText.strokeThickness=2;

    this.menuText = game.add.text(game.width/2, game.height/2 + game.height/3, "Al Menu", { font: "bold 34px Arial", fill: "#FFFFFF" });
    this.menuText.anchor.set(0.5);
    this.menuText.stroke =  'black';
    this.menuText.strokeThickness=2;

    this.menuText.inputEnabled = true;
    this.menuText.events.onInputDown.add(this.toMenu, this);

},
update: function() {
    if(game.isGamepaused){
        return;
    }

    // Update things ...
},
toMenu: function(){
    game.state.start('Menu');
},
toGameover: function(){
    game.state.start('Gameover');
},
toGame: function(){
    //Para reintentar
    // Reset things...
    game.state.start('Game');
},
muteGame: function(){
    game.sound.mute = !game.sound.mute;
    fx.play('button_click'); 
    statusbarGroup.statusbar_sound_icon.loadTexture(game.sound.mute ? 'sound_off' : 'sound_on', 0);
},
pauseGame: function(){
    game.isGamepaused = !game.isGamepaused;
    fx.play('button_click');
    if(game.isGamepaused){
        game.tweens.pauseAll();
        game.time.events.pause();
    }
    else{
        game.tweens.resumeAll();
        game.time.events.resume();
    }
}
}
