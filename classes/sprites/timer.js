var Timer = function(game,x,y) {
	Phaser.Text.call(this, game, x, y, '',{ font: "bold 34px Arial", fill: "#FFFFFF" });
	game.world.add(this);
	this.anchor.set(1.0);
    this.stroke =  'black';
    this.strokeThickness=2;
	this.fontSize = 32;
	this.a = game.time.time;
}

Timer.prototype = Object.create(Phaser.Text.prototype);
Timer.prototype.constructor = Timer;
Timer.prototype.update = function() {

	this.b = game.time.time;

	timeLeft -= (this.b - this.a);

	this.a = game.time.time;

    if(timeLeft <= 0){
        this.setText('00' + ':'+ '00' + ':' + '00');
        return;
    }

	this.minutes = Math.floor(timeLeft / 60000) % 60;
 
    this.seconds = Math.floor(timeLeft / 1000) % 60;
 
    this.milliseconds = Math.floor(timeLeft) % 100;
 
    //If any of the digits becomes a single digit number, pad it with a zero
    if (this.milliseconds < 10)
        this.milliseconds = '0' + this.milliseconds;
 
    if (this.seconds < 10)
        this.seconds = '0' + this.seconds;
 
    if (this.minutes < 10)
        this.minutes = '0' + this.minutes;
 
    this.setText(this.minutes + ':'+ this.seconds + ':' + this.milliseconds);
}