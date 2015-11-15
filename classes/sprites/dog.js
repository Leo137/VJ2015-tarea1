var Dog = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'dog');
    this.animations.add('walk',[0,1,0,2]);
    this.animations.play('walk', 10, true);
    this.anchor.setTo(0.5,0.5);
    this.scale.setTo(0.5,0.5);    
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.world.add(this);
}

Dog.prototype = Object.create(Phaser.Sprite.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.update = function(cursors,layer) {
	 this.body.acceleration.y = 1600;
	 game.physics.arcade.collide(this, layer);
	 if(cursors){
		 if (cursors.left.isDown)
		 {
		 	this.animations.play('walk', 10, true);
		 	this.scale.x = 0.5;
		 	this.body.velocity.x -= 60;
		 	if(this.body.velocity.x < -200){
		 		this.body.velocity.x = -200;
		 	}
		 }
		 else if (cursors.right.isDown)
		 {
		 	this.animations.play('walk', 10, true);
		 	this.scale.x = -0.5;
		 	this.body.velocity.x += 60;
		 	if(this.body.velocity.x > 200){
		 		this.body.velocity.x = 200;
		 	}
		 }
		 else{
		 	this.animations.stop('walk',true);
		 	this.body.velocity.x = this.body.velocity.x*0.86;
		 	if(this.body.velocity.x < 1){
		 		this.body.velocity.x = 0;
		 	}
		 }

		 if(cursors.up.isDown){
		 	
		 	if(this.body.onFloor() && this.alive && !this.upDown){
		 		this.holdtime = 9;
		 		this.body.velocity.y = -250;
		 		fx.play('numkey');
		 	}
		 	else if(this.holdtime > 0){
		 		this.body.velocity.y -= 46;
		 		this.holdtime--;
		 	}	
		 	this.upDown = true;
		 }
		 else{
		 	this.upDown = false;
		 }
	 }

	 if(this.body.onBeginContact){
	 	this.body.velocity.y = 0;
	 }
}