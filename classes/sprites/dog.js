var Dog = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'dog');
    this.animations.add('walk',[0,1,2,1]);
    this.animations.play('walk', 10, true);
    this.anchor.setTo(0.5,0.5);
    this.scale.setTo(0.9);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.world.add(this);
    this.body.setSize(32+12, 12, 0, 20);

}

Dog.prototype = Object.create(Phaser.Sprite.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.update = function(cursors,shootButton,layer) {
	 this.body.acceleration.y = 1600;
	 game.physics.arcade.collide(this, layer);
	 this.body.velocity.x = this.body.velocity.x*0.86;
	 	if(Math.abs(this.body.velocity.x) < 1){
	 		this.body.velocity.x = 0;
	 	}
	if(shootButton && shootButton.isDown){
	 	this.frame = 3;
	 	this.catMode = true;
	}
	else{
	 	this.catMode = false;
		 if(cursors){
			 if (cursors.left.isDown)
			 {
			 	this.animations.play('walk', 10, true);
			 	this.scale.x = -0.9;
			 	this.body.velocity.x -= 60;
			 	if(this.body.velocity.x < -200){
			 		this.body.velocity.x = -200;
			 	}
			 }
			 else if (cursors.right.isDown)
			 {
			 	this.animations.play('walk', 10, true);
			 	this.scale.x = +0.9;
			 	this.body.velocity.x += 60;
			 	if(this.body.velocity.x > 200){
			 		this.body.velocity.x = 200;
			 	}
			 }
			 else{
			 	this.animations.stop('walk',true);
			 	
			 }

			 if(cursors.up.isDown){
			 	
			 	if( (this.body.touching.down || this.body.onFloor()) && this.alive && !this.upDown){
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
	}
	
	 if(this.body.onBeginContact){
	 	this.body.velocity.y = 0;
	 }
}