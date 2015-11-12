BasicGame.PreMenu = function(){ }; 
//Esto hace todo lo que tiene que estar cargado antes que se muestre el menu siquiera
BasicGame.PreMenu.prototype = {
	preload: function(){
		game.stage.backgroundColor = '#787878';
		//game.load.audio('main_menu_bgm','assets/bgm/main_menu.ogg');
		MenuBackground.loadSprites();
		game.sound.mute = false;
		LocalizableStrings.loadFile();
	},
	create: function(){
		game.state.start('Menu');
	}
}
