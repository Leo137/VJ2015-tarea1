BasicGame.Game = function(){ }; 

BasicGame.Game.prototype = { 

loadUpdate : function(){
    if(this.pieProgressPie && this.pieProgressPie.alive){
    	this.progress =  (game.load.progress/100.0);
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
    game.load.spritesheet('dog', 'assets/sprites/player.png', 64, 64);
    game.load.spritesheet('cat', 'assets/sprites/cat.png', 64, 64);
    game.load.spritesheet('switches', 'assets/sprites/switches.png', 64, 64);
    game.load.spritesheet('cannon', 'assets/sprites/cannon.png', 64, 64);
    game.load.image('mapa', 'assets/tiles/tilemap.png');
    game.load.tilemap('level_1', 'assets/maps/1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level_2', 'assets/maps/2.json', null, Phaser.Tilemap.TILED_JSON);


},
create: function() {

    this.pieProgressPie.DestroyPie();
    this.pieProgressPie = null;

    // Create things...
    this.menuText = game.add.text(game.width -10, game.height -10, "Al Menu", { font: "bold 34px Arial", fill: "#FFFFFF" });
    this.menuText.anchor.set(1.0);
    this.menuText.stroke =  'black';
    this.menuText.strokeThickness=2;

    this.menuText.inputEnabled = true;
    this.menuText.events.onInputDown.add(this.toMenu, this);

    this.map = game.add.tilemap('level_1');
    this.map.addTilesetImage('mapa');
    this.map.setCollisionBetween(0,900);
    this.layer = this.map.createLayer('Capa de Patrones 1');
    //layer.anchor.setTo(0.5);

    this.catGroup = new CatGroup(game);
    this.switchGroup = new SwitchGroup(game);
    this.cannonGroup = new CannonGroup(game);

    // transformar enemigos a instancias

    for(var y = 0; y < this.map.height; ++y){
        for(var x = 0; x < this.map.width; ++x){
            var tile = this.map.layers[0].data[y][x];
            if(tile != null){
                if(tile.index == 151){
                    // Perro
                    this.player = new Dog(game, tile.worldX, tile.worldY);
                    this.map.removeTile(x,y);
                }
                if(tile.index == 152){
                    // Gato
                    this.catGroup.spawn(game,tile.worldX,tile.worldY);
                    this.map.removeTile(x,y);
                }

                if(tile.index == 158){
                    // Cannon left
                    this.cannonGroup.spawnCannon(game,tile.worldX,tile.worldY,-1);
                    this.map.removeTile(x,y);
                }

                if(tile.index == 159){
                    // Cannon right
                    this.cannonGroup.spawnCannon(game,tile.worldX,tile.worldY,+1);
                    this.map.removeTile(x,y);
                }

                if(tile.index == 160){
                    // Switch
                    this.switchGroup.spawn(game,tile.worldX,tile.worldY);
                    this.map.removeTile(x,y);
                }

                if(tile.index == 170){
                    // Spotlight
                    this.spotlight = new Spotlight(game);
                    this.map.removeTile(x,y);
                }

                

                if(tile.index == 17){
                    // var enemy2 = enemys_2.getFirstExists(false);
                    // enemy2.reset(tile.worldX+8,tile.worldY+6);
                    // enemy2.body.setSize(14, 19, 0, 6);
                    // enemy2.animations.add('walk',[0,1,0,2]);
                    // enemy2.animations.play('walk', 10, true);
                    // enemy2.timeto = 0;
                    // enemy2.active = false;
                    // if(player.position.x < enemy2.position.x ){
                    //     enemy2.scale.x = -1.0;
                    // }
                    // else{
                    //     enemy2.scale.x = +1.0;
                    // }
                    this.map.removeTile(x,y);
                }

                if(tile.index == 27){
                    // var key = keys.getFirstExists(false);
                    // key.reset(tile.worldX,tile.worldY);
                    // key.body.setSize(16, 26, 1, 0);
                    this.map.removeTile(x,y);
                }

                if(tile.index == 28){
                    // var door = doors.getFirstExists(false);
                    // door.reset(tile.worldX,tile.worldY);
                    // door.body.setSize(64, 64, 1, 0);
                    // door.body.immovable = true;
                    this.map.removeTile(x,y);
                }

            }
        }
    }

    // Creacion de cursores
    this.cursors = game.input.keyboard.createCursorKeys();
    this.shootButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    game.time.advancedTiming = true;

    game.world.bringToTop(this.menuText);
},
update: function() {
    if(game.isGamepaused){
        return;
    }
    // Update things ...
    this.catGroup.update(this.layer);
    this.switchGroup.update(this.layer);
    this.cannonGroup.update(this.layer,this.player);
    this.player.update(this.cursors,this.shootButton,this.layer);
    

    game.physics.arcade.overlap(this.catGroup, this.player, this.enemyTouchPlayer, null, this);
    game.physics.arcade.overlap(this.switchGroup, this.player, this.playerTouchSwitch, null, this);
    game.physics.arcade.overlap(this.cannonGroup, this.player, this.enemyTouchPlayer, null, this);

    if(this.switchGroup.isAllSwitchesPressed()){
        //fx.play('button_click');
        // Next stage!
    }
    if(this.spotlight){
        this.spotlight.update();
        if(this.spotlight.isPlayerInSpotlightRegion(this.player)){
            this.spotlight.destroySpotlight();
            this.spotlight = null;
            this.alert = new Alert(game);
        }
    }
    if(this.alert){
        this.alert.update();
    }
},
enemyTouchPlayer: function(player,enemy){
    if(enemy.isCannon){
        return;
    }
    this.player.kill();
},
playerTouchSwitch: function(player,switchy){
    this.switchGroup.touch(switchy);
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
