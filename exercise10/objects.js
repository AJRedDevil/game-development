// Pacman Class
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

Pacman.prototype.update = function(elapsed, width, height) {
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

Pacman.prototype.move_right = function() {
  this.x_speed = this.speed;
  this.y_speed = 0;
  this.angle = 0;
};
Pacman.prototype.move_down = function() {
  this.x_speed = 0;
  this.y_speed = this.speed;
  this.angle = 0.5 * Math.PI;
};
Pacman.prototype.move_left = function() {
  this.x_speed = -this.speed;
  this.y_speed = 0;
  this.angle = Math.PI;
};
Pacman.prototype.move_up = function() {
  this.x_speed = 0;
  this.y_speed = -this.speed;
  this.angle = 1.5 * Math.PI;
};

// Ghost Class
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

Ghost.prototype.update = function(target, elapsed) {
  const angle = Math.atan2(target.y - this.y, target.x - this.x);
  const x_speed = Math.cos(angle) * this.speed;
  const y_speed = Math.sin(angle) * this.speed;
  this.x += x_speed * elapsed;
  this.y += y_speed * elapsed;
};
