BasicGame.Game = function(){ }; 
var levelNumber = 1;
var timeLeft = 300 * 1000;
var music;

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
    game.load.spritesheet('laser', 'assets/sprites/laser.png', 64, 64);

    game.load.audio('musica', ['assets/music/music.wav', 'assets/music/music.ogg']);

    game.load.image('mapa', 'assets/tiles/tilemap.png');
    game.load.tilemap('level_'+levelNumber.toString(), 'assets/maps/'+levelNumber+'.json', null, Phaser.Tilemap.TILED_JSON);
},

create: function() {

    this.pieProgressPie.DestroyPie();
    this.pieProgressPie = null;

    if(music){
        music.stop();
        music.destroy();
    }
    music = game.add.audio('musica');
    music.play();

    // Create things...
    this.menuText = game.add.text(game.width -10, game.height -10, "Al Menu", { font: "bold 34px Arial", fill: "#FFFFFF" });
    this.menuText.anchor.set(1.0);
    this.menuText.stroke =  'black';
    this.menuText.strokeThickness=2;

    this.menuText.inputEnabled = true;
    this.menuText.events.onInputDown.add(this.toMenu, this);

    this.map = game.add.tilemap('level_'+levelNumber.toString());
    this.map.addTilesetImage('mapa');
    this.map.setCollisionBetween(0,900);
    this.layer = this.map.createLayer('Capa de Patrones 1');
    //layer.anchor.setTo(0.5);

    this.catGroup = new CatGroup(game);
    this.switchGroup = new SwitchGroup(game);
    this.cannonGroup = new CannonGroup(game);
    this.laserGroup = new LaserGroup(game,this.map);
    this.timer = new Timer(game,game.width-50,50);

    // transformar enemigos a instancias

    for(var y = 0; y < this.map.height; ++y){
        for(var x = 0; x < this.map.width; ++x){
            var tile = this.map.layers[0].data[y][x];
            if(tile != null){
                if(tile.index == 151){
                    // Perro
                    this.player = new Dog(game, tile.worldX, tile.worldY);
                    this.playerOrigpositionX = tile.worldX;
                    this.playerOrigpositionY = tile.worldY;
                    this.map.removeTile(x,y);
                }
                if(tile.index == 152){
                    // Gato
                    this.catGroup.spawn(game,tile.worldX,tile.worldY);
                    this.map.removeTile(x,y);
                }

                if(tile.index == 154){
                    // Laser vDown
                    var laser = this.laserGroup.spawnLaser(game,tile.worldX,tile.worldY,true,1,-1);
                    this.map.removeTile(x,y);
                    this.laserGroup.createBeam(laser,tile.worldX,tile.worldY,true,1,-1);
                }

                if(tile.index == 155){
                    // Laser vUp
                    var laser = this.laserGroup.spawnLaser(game,tile.worldX,tile.worldY,true,1,1);
                    this.map.removeTile(x,y);
                    this.laserGroup.createBeam(laser,tile.worldX,tile.worldY,true,1,1);
                }

                if(tile.index == 156){
                    // Laser hLeft
                    this.laserGroup.spawnLaser(game,tile.worldX,tile.worldY,false,-1,1);
                    this.map.removeTile(x,y);
                }

                if(tile.index == 157){
                    // Laser hRight
                    this.laserGroup.spawnLaser(game,tile.worldX,tile.worldY,false,1,1);
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
            }
        }
    }

    // Creacion de cursores
    this.cursors = game.input.keyboard.createCursorKeys();
    this.shootButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    game.time.advancedTiming = true;

    game.world.bringToTop(this.menuText);
    game.world.bringToTop(this.timer);
},

update: function() {
    if(game.isGamepaused){
        return;
    }
    if(timeLeft <= 0){
        this.toGameover();
    }
    // Update things ...
    this.catGroup.update(this.layer);
    this.switchGroup.update(this.layer);
    this.cannonGroup.update(this.layer,this.player);
    this.laserGroup.update(this.layer,this.player);
    this.player.update(this.cursors,this.shootButton,this.layer);
    this.timer.update();
    
    if(this.player && this.player.alive){
        game.physics.arcade.overlap(this.catGroup, this.player, this.enemyTouchPlayer, null, this);
        game.physics.arcade.overlap(this.switchGroup, this.player, this.playerTouchSwitch, null, this);
        game.physics.arcade.overlap(this.cannonGroup, this.player, this.enemyTouchPlayer, null, this);
        game.physics.arcade.overlap(this.laserGroup, this.player, this.enemyTouchPlayer, null, this);
    }

    
    if(this.switchGroup.isAllSwitchesPressed()){
        // Next stage!
        levelNumber++;
        if(this.spotlight){
            this.spotlight.destroySpotlight();
            this.spotlight = null;
        }
        if(this.alert){
            this.alert.destroyAlert();
            this.alert = null;
        }
        game.state.start('Game');
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
    console.log('asd');
    if(enemy.isCannon){
        return;
    }
    if(enemy.isLaser){
        return;
    }
    this.player.kill();
    this.player = new Dog(game, this.playerOrigpositionX, this.playerOrigpositionY);
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
