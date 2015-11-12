// Utils
function colorToHex(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);

    var rgb = blue | (green << 8) | (red << 16);
    return rgb;
};


BasicGame.Menu = function(){ }; 

BasicGame.Menu.prototype = { 
    loadUpdate : function(){
        if(this.pieProgressPie && this.pieProgressPie.alive){
            this.progress = (game.load.progress/100.0) * 1.0;
            if(this.progress != this.progress_prev){
                this.progress_prev = this.progress;
                pieTween = game.add.tween(this.pieProgressPie);
                pieTween.to({progress: (this.progress)}, 100, Phaser.Easing.Linear.None, true, 0, 0, false );
            }
        }
		this.menuBackground.updateBackground();
    },
    preload: function() {   
		this.menuBackground = new MenuBackground(game,0,0,game.width,game.height,'bg_pattern_color');
		this.menuBackground.isRandomColor = true;

        //GameVarsData.loadFile();
        this.pieProgressPie = new PieProgress(game, game.width/2,game.height/2, 16, '#909090', 0);
		game.world.add(this.pieProgressPie);
		this.pieProgressPie.alpha = 0;

		// game.load.audio('sec_menu_bgm','assets/bgm/sec_menu.ogg');
		// game.load.audio('stage_bg','assets/bgm/stage_bg.ogg');
		// game.load.audio('yay', 'assets/bgm/win_stage.ogg');
		// game.load.audio('buu', 'assets/bgm/lose_stage.ogg');

        game.load.audio('sfx', 'assets/sfx/fx.mp3');
        fx = game.add.audio('sfx');
        fx.allowMultiple = true;

        //  And this defines the markers.

        //  They consist of a key (for replaying), the time the sound starts and the duration, both given in seconds.
        //  You can also set the volume and loop state, although we don't use them in this example (see the docs)

        fx.addMarker('button_click', 4.049, 0.209);
        fx.addMarker('coin_get', 4.258, 0.648);
        fx.addMarker('happy_2', 4.906, 0.914);
        fx.addMarker('jingle', 5.820, 0.993);
        fx.addMarker('sound_wrong', 6.813, 0.366);
        fx.addMarker('unhappy', 7.179, 0.967);
        fx.addMarker('up_short', 8.145, 0.836);

        game.load.image('logo', 'assets/sprites/logo.png');

        // game.load.image('money_icon', 'assets/sprites/money_icon.png');

        game.load.image('sound_on', 'assets/sprites/sound_on.png');
        game.load.image('sound_off', 'assets/sprites/sound_off.png');

        // game.load.spritesheet('timer', 'assets/sprites/timer.png', 150, 20);
    },
    create: function() {

        this.pieProgressPie.DestroyPie();
        this.pieProgressPie = null;

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        this.logo = game.add.sprite(game.width/2, game.height/2, 'logo');
        this.logo.anchor.setTo(0.5,0.5);
        this.logo.scale.setTo(1.0);

        this.startGameText = game.add.text(game.width/2, game.height/2 + game.height/3, LocalizableStrings.getString("menu-startgametext"), { font: "bold 34px Arial", fill: "#FFFFFF" });

        this.startGameText.anchor.set(0.5);
        this.startGameText.stroke =  'black';
        this.startGameText.strokeThickness=2;

        this.startGameText.inputEnabled = true;
        this.startGameText.events.onInputDown.add(this.toGame, this);

        if(isLandscapeLittle){
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        }
        else{
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }
        if(isLandscape){
            this.scale.minWidth = 768/2;
            this.scale.minHeight = 432/2;
            this.scale.maxWidth = 768*1.5;
            this.scale.maxHeight = 432*1.5;
        }
        else{
            this.scale.minWidth = 400/2;
            this.scale.minHeight = 600/2;
            this.scale.maxWidth = 400*1.5;
            this.scale.maxHeight = 600*1.5;
        }

        // Center canvas
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.statusbar_sound_icon = game.add.sprite(game.width-25,game.height - 20,game.sound.mute ? 'sound_off' : 'sound_on', 0);
        this.statusbar_sound_icon.anchor.set(0.5);
        this.statusbar_sound_icon.scale.setTo(0.8);
        this.statusbar_sound_icon.inputEnabled = true;
        this.statusbar_sound_icon.events.onInputDown.add(this.muteGame);

        // Start Preloader
        this.time = game.time.time;
        game.stage.backgroundColor = 0x6680CC;
    },
    update: function() {
		this.menuBackground.updateBackground();
        if(game.time.time > this.time + 50){
            this.time = game.time.time;
            this.logo.y = game.height/2 + Math.sin(game.time.time/200)*3;
            this.logo.angle = Math.sin(game.time.time/800)*0.2;
        }
    },
    toGame: function(levelNumber,tutorial){
        fx.play('button_click');
        game.state.start('Game');
    },
    muteGame: function(){
        game.sound.mute = !game.sound.mute;
        fx.play('button_click');
        game.state.callbackContext.statusbar_sound_icon.loadTexture(game.sound.mute ? 'sound_off' : 'sound_on', 0);
    },
}

