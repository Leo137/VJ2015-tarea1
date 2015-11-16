var Alert = function(game) {
	Phaser.BitmapData.call(this,game,'alert');

	this.bitmap = game.add.bitmapData(this.game.width, this.game.height);
    this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
    this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
    this.lightBitmap = this.game.add.image(0, 0, this.bitmap);
    this.lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;

    this.rayBitmapImage = game.add.image(0, 0, this);
    this.rayBitmapImage.visible = true;
    this.alertPeriod = 10.0;
    this.actualTime = 0.0;
}

Alert.prototype = Object.create(Phaser.BitmapData.prototype);
Alert.prototype.constructor = Alert;
Alert.prototype.destroyAlert = function() {
	this.bitmap.cls();
	this.bitmap.destroy();
}
Alert.prototype.update = function() {
	var c = Phaser.Color.HSVtoRGB(0,1.0,1.0);
	var webColor = Phaser.Color.getWebRGB(c);
	this.bitmap.context.fillStyle = webColor;
    this.bitmap.context.fillRect(0, 0, this.game.width, this.game.height);
    this.actualTime += 1;
    this.lightBitmap.alpha = 1.0*Math.abs(Math.sin((this.actualTime/this.alertPeriod)));
    this.bitmap.dirty = true;
    this.dirty = true;
}
