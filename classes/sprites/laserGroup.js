var LaserGroup = function(game,map){
	Phaser.Group.call(this, game);
	this.enableBody = true;
	this.physicsBodyType = Phaser.Physics.ARCADE;
	this.createMultiple(300, 'laser');
	this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);
    this.setAll('scale.x', 0.5);
    this.setAll('scale.y', 0.5);
    this.map = map;
	this.timeToFire = 3000;
	this.timeFiring = 500;
}

LaserGroup.prototype = Object.create(Phaser.Group.prototype);
LaserGroup.prototype.constructor = LaserGroup;
LaserGroup.prototype.spawnLaser = function(game,x,y,vertical,direction_h,direction_v) {
	var laser = this.getFirstExists(false);
    laser.reset(x+16,y+16);
    laser.body.setSize(60, 60, 0, 0);
    laser.body.immovable = true;
    laser.direction_h = direction_h;
    laser.direction_v = direction_v;
    laser.vertical = vertical;
    laser.scale.x = laser.direction_h * laser.scale.x;
    laser.scale.y = laser.direction_v * laser.scale.y;
    laser.timeToFire = this.timeToFire;
    laser.timeFiring = this.timeFiring;
    laser.frame = 0;
    laser.isLaser = true;
    laser.isBeam = false;
    return laser;
}

LaserGroup.prototype.createBeam = function(laser,x,y,vertical,direction_h,direction_v){
	var beam = this.getFirstExists(false);
    beam.reset(x+16,y - (direction_v == -1 ? direction_v * 32 : 0));
    beam.body.setSize(30, 32, 0, 0);
    beam.body.immovable = false;
    beam.direction_h = direction_h;
    beam.direction_v = direction_v;
    beam.anchor.y = 1.0;
    beam.scale.x = 1.0;
    beam.scale.y = 1.0;
    beam.scale.x = beam.direction_h * beam.scale.x;
    beam.scale.y = beam.direction_h *beam.scale.y;
    beam.vertical = vertical;
    beam.frame = 1;
    beam.isLaser = false;
    beam.isBeam = true;
    if(vertical){
    	for(var ver = 0.0; ver<2000; ver+= 32){
    		var tile = this.map.getTile(Math.floor(beam.x/32),Math.floor((beam.y+ver*-direction_v)/32) + (direction_v == 1 ? -1 : 0));
    		if(tile != null && tile.index != 0){
    			beam.height = direction_v * ver;
    			break;
    		}
    	}
    	beam.anchor.y = direction_v == -1 ? 1.0 : 1.0;
    }
    else{
    	for(var ver = 0.0; ver<2000; ver+= 32){
    		var tile = this.map.getTile(Math.floor((beam.x+ver*-direction_h)/32),Math.floor(beam.y)/32);
    		if(tile != null && tile.index != 0){
    			beam.width = direction_h * ver;
    			break;
    		}
    	}
    	beam.anchor.x = direction_v == -1 ? 1.0 : 1.0;
    }
    beam.body.setSize(5, 64, 0, direction_v == -1 ? direction_v*beam.height : 0);
    beam.timeFiring = this.timeFiring;
    laser.beam = beam;
}

LaserGroup.prototype.update = function(layer, player){
	var laserGroup = this;
    game.physics.arcade.collide(this, layer);
    this.forEachExists(function(item){
    	if(item.isBeam){
    		//game.debug.body(item);
    		item.timeFiring -= game.time.physicsElapsedMS;
    		if(item.timeFiring <= 0){
    			item.kill();
    		}
		}
	});
	this.forEachExists(function(item){
		if(item.isLaser){
			item.timeToFire -= game.time.physicsElapsedMS;
			if(item.timeToFire <= 0){
				item.beam.revive();
				item.beam.timeFiring = laserGroup.timeFiring;
				item.timeToFire = laserGroup.timeToFire;
			}
			game.physics.arcade.collide(player,item);
		}
    });

}
