var LaserGroup = function(game){
	Phaser.Group.call(this, game);
	this.enableBody = true;
	this.physicsBodyType = Phaser.Physics.ARCADE;
	this.createMultiple(100, 'laser');
	this.setAll('anchor.x', 0.0);
    this.setAll('anchor.y', 0.0);
    this.setAll('scale.x', 0.5);
    this.setAll('scale.y', 0.5);
	this.timeToFire = 130;
}

LaserGroup.prototype = Object.create(Phaser.Group.prototype);
LaserGroup.prototype.constructor = LaserGroup;
LaserGroup.prototype.spawnLaser = function(game,x,y,direction) {
	var laser = this.getFirstExists(false);

}

LaserGroup.prototype.spawnBeam = function(x,y,direction){

}

LaserGroup.prototype.update = function(layer, player){

}