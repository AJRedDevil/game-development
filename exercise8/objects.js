function Pacman(x, y, radius, speed) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.speed = speed;
  this.angle = 0;
  this.x_speed = speed;
  this.y_speed = 0;
  this.time = 0;
  this.mouth = 0;
}

Pacman.prototype.draw = function(ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);
  draw_pacman(ctx, this.radius, this.mouth);
  ctx.restore();
};

Pacman.prototype.turn = function(direction) {
  if (this.y_speed) {
    // if we are travelling vertically
    // set the horizontal speed and apply the direction
    this.x_speed = -direction * this.x_speed;
    // clear the vertical speed and rotate
    this.y_speed = 0;
    this.angle = this.x_speed > 0 ? 0 : Math.PI;
  } else {
    // if we are travelling horizontally
    // set the vertical speed and apply the direction
    this.y_speed = direction * this.x_speed;
    // clear the horizontal speed and rotate
    this.x_speed = 0;
    this.angle = this.y_speed > 0 ? 0.5 * Math.PI : 1.5 * Math.PI;
  }
};

Pacman.prototype.turn_left = function() {
  this.turn(-1);
};

Pacman.prototype.turn_right = function() {
  this.turn(1);
};

Pacman.prototype.update = function(elapsed, width, height) {
  // an average of once every 100 frames
  if (Math.random() <= 0.01) {
    if (Math.random() < 0.5) {
      this.turn_left();
    } else {
      this.turn_right();
    }
  }

  if (this.x - this.radius + elapsed * this.x_speed > width) {
    this.x = -this.radius;
  }
  if (this.x + this.radius + elapsed * this.x_speed < 0) {
    this.x = width + this.radius;
  }
  if (this.y - this.radius + elapsed * this.y_speed > height) {
    this.y = -this.radius;
  }
  if (this.y + this.radius + elapsed * this.y_speed < 0) {
    this.y = height + this.radius;
  }
  this.x += this.x_speed * elapsed;
  this.y += this.y_speed * elapsed;
  this.time += elapsed;
  this.mouth = Math.abs(Math.sin(2 * Math.PI * this.time));
};

function Ghost(x, y, radius, speed, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.speed = speed;
  this.color = color;
}

Ghost.prototype.draw = function(ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  draw_ghost(ctx, this.radius, {
    fill: this.color,
  });
  ctx.restore();
};
