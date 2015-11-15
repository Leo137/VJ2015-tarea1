var SwitchGroup = function(game) {
	Phaser.Group.call(this, game);
    this.enableBody = true;
    this.createMultiple(20, 'switches');
    this.setAll('anchor.x', 0.0);
    this.setAll('anchor.y', 0.0);
    this.setAll('scale.x', 0.5);
    this.setAll('scale.y', 0.5);
}

SwitchGroup.prototype = Object.create(Phaser.Group.prototype);
SwitchGroup.prototype.constructor = SwitchGroup;
SwitchGroup.prototype.spawn = function(game,x,y) {
	var switchy = this.getFirstExists(false);
    switchy.reset(x,y);
    switchy.body.setSize(64, 64, 0, 0);
    switchy.body.immovable = true;
    switchy.frame = 0;
    switchy.touched = false;
}
SwitchGroup.prototype.update = function(layer) {
	// :P
}
SwitchGroup.prototype.isAllSwitchesPressed = function(layer) {
	var pressed = true;
	this.forEachExists(function(switchy){
		if(!switchy.touched){
			pressed = false;
		}
	});
	return pressed;
}
SwitchGroup.prototype.touch = function(switchy) {
	if(!switchy.touched){
		fx.play('button_click');
		switchy.frame = 1;
		switchy.touched = true;
	}
}