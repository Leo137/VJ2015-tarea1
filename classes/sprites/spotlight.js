var Spotlight = function(game) {
	Phaser.BitmapData.call(this,game,'spotlight');

	this.bitmap = game.add.bitmapData(this.game.width, this.game.height);
    this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
    this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
    var lightBitmap = this.game.add.image(0, 0, this.bitmap);
    lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;

    this.rayBitmapImage = game.add.image(0, 0, this);
    this.rayBitmapImage.visible = true;

    this.spotlightX = game.width;
   	this.spotlightWidthCeiling = 70;
   	this.spotlightWidthBase = 150;
   	this.spotlightDirection = -1;
   	this.spotlightSpeed = -2;
}

Spotlight.prototype = Object.create(Phaser.BitmapData.prototype);
Spotlight.prototype.constructor = Spotlight;
Spotlight.prototype.destroySpotlight = function() {
	this.bitmap.cls();
	this.bitmap.destroy();
}
Spotlight.prototype.update = function() {

	this.bitmap.context.fillStyle = 'rgb(160, 160, 160)';
    this.bitmap.context.fillRect(0, 0, this.game.width, this.game.height);

    this.spotlightPoints = [];
    this.spotlightPoints.push(new Phaser.Point(this.spotlightX + this.spotlightWidthBase/2, this.game.height));
    this.spotlightPoints.push(new Phaser.Point(this.spotlightX + this.spotlightWidthCeiling/2, 0));
    this.spotlightPoints.push(new Phaser.Point(this.spotlightX - this.spotlightWidthCeiling/2, 0));
    this.spotlightPoints.push(new Phaser.Point(this.spotlightX - this.spotlightWidthBase/2, this.game.height));

    this.bitmap.context.beginPath();
    this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
    this.bitmap.context.moveTo(this.spotlightPoints[0].x, this.spotlightPoints[0].y);
    for(var j = 0; j < this.spotlightPoints.length; j++) {
        this.bitmap.context.lineTo(this.spotlightPoints[j].x, this.spotlightPoints[j].y);
    }
    this.bitmap.context.closePath();
    this.bitmap.context.fill();

    this.bitmap.dirty = true;
    this.dirty = true;

    if(this.spotlightX <= 0 || this.spotlightX > this.game.width){
    	this.spotlightDirection = this.spotlightDirection * -1;
    }
    this.spotlightX += this.spotlightDirection * this.spotlightSpeed;
}
Spotlight.prototype.isPlayerInSpotlightRegion = function(player) {
	if(this.spotlightPoints && player.alive && !player.catMode){
		var polygon = new Phaser.Polygon(this.spotlightPoints);
		return polygon.contains(player.x,player.y);
	}
	return false;
}
