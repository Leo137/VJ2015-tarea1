function MenuBackground(game,x,y,width, height, key, frame){
	//Crea un background para el menu
	this.backgroundName = isLandscape ? (isLandscapeLittle ? "bg_littlelandscape" : "bg_landscape") : "bg_portrait";
	this.background = game.add.sprite(x,y,this.backgroundName);
	Phaser.TileSprite.apply(this,arguments);
	game.world.add(this);
	if(key == 'bg_pattern_color'){
		this.blendMode = PIXI.blendModes.MULTIPLY;
	}
	this.z = 0;
	this.background.z = -1;

	if(MenuBackground.xPosition == null){
		MenuBackground.xPosition = 0;
	}
	if(MenuBackground.yPosition == null){
		MenuBackground.yPosition = 0;
	}
	this.tilePosition.x = MenuBackground.xPosition;
	this.tilePosition.y = MenuBackground.yPosition;
}
MenuBackground.prototype = Phaser.TileSprite.prototype;
MenuBackground.prototype.constructor = MenuBackground;

MenuBackground.prototype.updateBackground = function(isColor){
	//Hace el movimiento del fondo

	MenuBackground.xPosition -= 2.6;
	MenuBackground.yPosition -= 0.1*Math.cos(game.time.time*0.001);
	this.tilePosition.x = MenuBackground.xPosition;
	this.tilePosition.y = MenuBackground.yPosition;

	if(MenuBackground.color1 == null){
		MenuBackground.oldHue = 0.0;
		var c = Phaser.Color.HSVtoRGB(MenuBackground.oldHue+0.0 - Math.floor(MenuBackground.oldHue+0.0),0.55,1.0);
		MenuBackground.color1 = Phaser.Color.getColor(c.r,c.g,c.b);
	}
	if(MenuBackground.color2 == null){
		var c = Phaser.Color.HSVtoRGB(MenuBackground.oldHue+0.3 - Math.floor(MenuBackground.oldHue+0.3),0.55,1.0);
		if(!this.isRandomColor){
			MenuBackground.color2 = 0xffffff;
		}
		else{
			MenuBackground.color2 = Phaser.Color.getColor(c.r,c.g,c.b);
		}
	}
	if(MenuBackground.steps == null){
		MenuBackground.steps = 60;
		MenuBackground.currentStep = 0;
	}
	if(MenuBackground.currentStep >= MenuBackground.steps){
		MenuBackground.oldHue += 0.3;
		MenuBackground.color1 = MenuBackground.color2;
		var c = Phaser.Color.HSVtoRGB(MenuBackground.oldHue+0.3 - Math.floor(MenuBackground.oldHue+0.3),0.55,1.0);
		if(!this.isRandomColor){
			MenuBackground.color2 = 0xffffff;
		}
		else{
			MenuBackground.color2 = Phaser.Color.getColor(c.r,c.g,c.b);
		}
		MenuBackground.currentStep = 0;
	}

	MenuBackground.randomColor = Phaser.Color.interpolateColor(MenuBackground.color1,
								MenuBackground.color2,MenuBackground.steps,MenuBackground.currentStep);
	this.background.tint = MenuBackground.randomColor;
	MenuBackground.currentStep ++;
	
}
MenuBackground.prototype.deleteBackground = function(){
	//Destruye ambos sprites de background;
	this.background.destroy();
	this.destroy();
}
MenuBackground.loadSprites = function(){
	//Carga los sprites
	game.load.image('bg_landscape', 'assets/sprites/bg_landscape.png');
	game.load.image('bg_littlelandscape', 'assets/sprites/bg_littlelandscape.png');
	game.load.image('bg_portrait', 'assets/sprites/bg_portrait.png');
	game.load.image('bg_pattern_color', 'assets/sprites/bg_pattern_color.png');
	game.load.image('bg_pattern_mono', 'assets/sprites/bg_pattern_mono.png');
}


