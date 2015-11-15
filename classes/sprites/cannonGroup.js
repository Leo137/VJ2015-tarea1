var CannonGroup = function(game) {
	Phaser.Group.call(this, game);
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.createMultiple(300, 'cannon');
    this.setAll('anchor.x', 0.0);
    this.setAll('anchor.y', 0.0);
    this.setAll('scale.x', 0.5);
    this.setAll('scale.y', 0.5);
    this.timeToFire = 260;
}

CannonGroup.prototype = Object.create(Phaser.Group.prototype);
CannonGroup.prototype.constructor = CannonGroup;
CannonGroup.prototype.spawnCannon = function(game,x,y,direction) {
	var cannon = this.getFirstExists(false);
    cannon.reset(x,y);
    cannon.body.setSize(60, 60, direction == -1 ? 32 : 0, 0);
    cannon.anchor.x = direction == -1 ? 1.0 : 0.0;
    cannon.body.immovable = true;
    cannon.direction = direction;
    cannon.scale.x = cannon.direction * cannon.scale.x;
    cannon.timeToFire = this.timeToFire;
    cannon.frame = 0;
    cannon.isCannon = true;
    cannon.isBullet = false;
}
CannonGroup.prototype.spawnBullet = function(x,y,direction) {
	var bullet = this.getFirstExists(false);
    bullet.reset(x+direction*20,y);
    bullet.body.setSize(64, 64, direction == -1 ? 32 : 0, 0);
    bullet.anchor.x = direction == -1 ? 1.0 : 0.0;
    bullet.body.immovable = false;
    bullet.direction = direction;
    bullet.scale.x = bullet.direction * bullet.scale.x;
    bullet.frame = 1;
    bullet.isBullet = true;
    bullet.isCannon = false;
}
CannonGroup.prototype.update = function(layer,player) {
    var speedBullet = 240;
    var cannonGroup = this;
    game.physics.arcade.collide(this, layer);
    this.forEachExists(function(item){
    if(item.isBullet){
			item.body.velocity.x = speedBullet * item.direction;
			item.body.velocity.y = 0;
			if(item.body.onWall()){
				item.kill();
			}
		}
	});
	this.forEachExists(function(item){
		if(item.isCannon){
			item.timeToFire--;
			if(item.timeToFire <= 0){
				cannonGroup.spawnBullet(item.x,item.y,item.direction);
				item.timeToFire = cannonGroup.timeToFire;
			}
			game.physics.arcade.collide(player,item);
		}
		
    });
}