const AsteroidsGame = function(id) {
  this.canvas = document.getElementById(id);
  this.c = this.canvas.getContext('2d');
  this.canvas.focus();
  this.guide = false;
  this.ship_mass = 10;
  this.ship_radius = 15;
  this.asteroid_mass = 500;
  this.asteroid_push = 500000; // max force to apply in one frame

  this.ship = new Ship(
    this.canvas.width / 2,
    this.canvas.height / 2,
    1000,
    200
  );
  this.projectiles = [];
  this.asteroids = [];
  this.asteroids.push(this.moving_asteroid());
  this.canvas.addEventListener('keydown', this.keyDown.bind(this), true);
  this.canvas.addEventListener('keyup', this.keyUp.bind(this), true);
  window.requestAnimationFrame(this.frame.bind(this));
};

AsteroidsGame.prototype.moving_asteroid = function(elapsed) {
  const asteroid = this.new_asteroid();
  this.push_asteroid(asteroid, elapsed);
  return asteroid;
};
AsteroidsGame.prototype.new_asteroid = function() {
  return new Asteroid(
    this.asteroid_mass,
    this.canvas.width * Math.random(),
    this.canvas.height * Math.random()
  );
};
AsteroidsGame.prototype.push_asteroid = function(asteroid, elapsed = 0.015) {
  asteroid.push(2 * Math.PI * Math.random(), this.asteroid_push, elapsed);
  asteroid.twist(
    (Math.random() - 0.5) * Math.PI * this.asteroid_push * 0.02,
    elapsed
  );
};

AsteroidsGame.prototype.keyDown = function(e) {
  this.key_handler(e, true);
};
AsteroidsGame.prototype.keyUp = function(e) {
  this.key_handler(e, false);
};
AsteroidsGame.prototype.key_handler = function(e, value) {
  let nothingHandled = false;
  switch (e.code || e.keyCode) {
    case 'ArrowLeft':
    case 37: // left arrow
      this.ship.left_thruster = value;
      break;
    case 'ArrowUp':
    case 38: // up arrow
      this.ship.thruster_on = value;
      break;
    case 'ArrowDown':
    case 39: // down arrow
      this.ship.retro_on = value;
      break;
    case 'ArrowRight':
    case 40: // right arrow
      this.ship.right_thruster = value;
      break;
    case 'Space':
    case 32: // spacebar
      this.ship.trigger = value;
      break;
    case 'KeyG':
    case 71: //g
      if (value) guide = !guide;
    default:
      nothingHandled = true;
  }
  if (!nothingHandled) e.preventDefault();
};

AsteroidsGame.prototype.frame = function(timestamp) {
  if (!this.previous) this.previous = timestamp;
  const elapsed = timestamp - this.previous;
  this.update(elapsed / 1000);
  this.draw();
  this.previous = timestamp;
  window.requestAnimationFrame(this.frame.bind(this));
};
