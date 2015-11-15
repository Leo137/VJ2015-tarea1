var CatGroup = function(game) {
	Phaser.Group.call(this, game);
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.createMultiple(300, 'cat');
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);
    this.forEach(function(item){
     item.animations.add("walk", [0,1,2,3,4,5,6,7]);
     item.animations.play("walk", 7, true);
	});
}

CatGroup.prototype = Object.create(Phaser.Group.prototype);
CatGroup.prototype.constructor = CatGroup;
CatGroup.prototype.spawn = function(game,x,y) {
	var cat = this.getFirstExists(false);
    cat.reset(x,y);
    cat.body.setSize(32, 32, 0,16);
}
CatGroup.prototype.update = function(layer) {
	var border = 13;
    var speed1 = 100;
    var speed2 = 100;
	this.forEachExists(function(cat){
		cat.body.acceleration.y = 1500;
		if(cat.body.onWall()){
            cat.scale.x = cat.scale.x * -1;
        } 
		if(cat.scale.x > 0){
            cat.body.velocity.x = speed1;
            cat.body.position.x +=border;
            game.physics.arcade.collide(cat, layer);
            if(!cat.body.onFloor()){
                cat.scale.x = -1;  
            }
            cat.body.position.x -=border;
        }
        else{
            cat.body.velocity.x = -speed1;

            cat.body.position.x -=border;
            game.physics.arcade.collide(cat, layer);
            if(!cat.body.onFloor()){
                cat.scale.x = +1;
            }
            cat.body.position.x +=border;
        }
        game.physics.arcade.collide(cat, layer);
        
    });
}