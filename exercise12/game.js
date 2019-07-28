const AsteroidsGame = function(id) {
  this.canvas = document.getElementById(id);
  this.c = this.canvas.getContext('2d');
  this.canvas.focus();
  this.guide = false;
  this.ship_mass = 10;
  this.ship_radius = 15;
  this.asteroid_mass = 500;
  this.asteroid_push = 500000; // max force to apply in one frame

	this.ship; = new Ship(
		this.canvas.width / 2,
		this.canvas.height / 2,
		1000,
		200
	);
	this.projectiles = [];
	this.asteroids = [];
	this.asteroids.push(this.moving_asteroid());
	this.canvas.addEventListener("keydown", this.keyDown.bind(this), true);
	this.canvas.addEventListener("keyup", this.keyUp.bind(this), true);
	window.requestAnimationFrame(this.frame.bind(this));
};
