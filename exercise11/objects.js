// Inheritance
function extend(ChildClass, ParentClass) {
  const parent = new ParentClass();
  ChildClass.prototype = parent;
  ChildClass.prototype.super = parent.constructor;
  ChildClass.prototype.constructor = ChildClass;
}

// Mass Class
function Mass(
  x,
  y,
  mass = 1,
  radius = 50,
  angle = 0,
  x_speed = 0,
  y_speed = 0,
  rotation_speed = 0
) {
  this.x = x;
  this.y = y;
  this.mass = mass;
  this.radius = radius;
  this.angle = angle;
  this.x_speed = x_speed;
  this.y_speed = y_speed;
  this.rotation_speed = rotation_speed;
}

Mass.prototype.update = function(elapsed, ctx) {
  this.x += this.x_speed * elapsed;
  this.y += this.y_speed * elapsed;
  this.angle = this.rotation_speed * elapsed;
  this.angle %= Math.PI * 2;
  if (this.x - this.radius > ctx.canvas.width) {
    this.x = -this.radius;
  }
  if (this.x + this.radius < 0) {
    this.x = ctx.canvas.width + this.radius;
  }
  if (this.y - this.radius > ctx.canvas.height) {
    this.y = -this.radius;
  }
  if (this.y + this.radius < 0) {
    this.y = ctx.canvas.height + this.radius;
  }
};

Mass.prototype.push = function(angle, force, elapsed) {
  this.x_speed += (elapsed * (Math.cos(angle) * force)) / this.mass;
  this.y_speed += (elapsed * (Math.sin(angle) * force)) / this.mass;
};

Mass.prototype.twist = function(force, elapsed) {
  this.rotation_speed += (elapsed * force) / this.mass;
};

Mass.prototype.speed = function() {
  return Math.sqrt(Math.pow(this.x_speed, 2) + Math.pow(this.y_speed, 2));
};

Mass.prototype.movement_angle = function() {
  return Math.atan2(this.y_speed, this.x_speed);
};

Mass.prototype.draw = function(c) {
  c.save();
  c.translate(this.x, this.y);
  c.rotate(this.angle);
  c.beginPath();
  c.arc(0, 0, this.radius, 0, 2 * Math.PI);
  c.lineTo(0, 0);
  c.strokeStyle = '#FFFFFF';
  c.stroke();
  c.restore();
};

// Asteroid Class
function Asteroid(mass, x, y, x_speed, y_speed, rotation_speed) {
  const density = 1; // kg per square pixel
  const radius = Math.sqrt(mass / density / Math.PI);
  this.super(x, y, mass, radius, 0, x_speed, y_speed, rotation_speed);
  this.circumference = 2 * Math.PI * this.radius;
  this.segments = Math.ceil(this.circumference / 15);
  this.segments = Math.min(25, Math.max(5, this.segments));
  this.noise = 0.2;
  this.shape = [];
  for (let i = 0; i < this.segments; i++) {
    this.shape.push(2 * (Math.random() - 0.5));
  }
}
extend(Asteroid, Mass);

Asteroid.prototype.draw = function(ctx, guide) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);
  draw_asteroid(ctx, this.radius, this.shape, {
    noise: this.noise,
    guide,
  });
  ctx.restore();
};

// Ship Class
function Ship(x, y, power) {
  this.super(x, y, 10, 20, 1.5 * Math.PI);
  this.thruster_power = power;
  this.steering_power = power / 20;
  this.right_thruster = false;
  this.left_thruster = false;
  this.thruster_on = false;
}
extend(Ship, Mass);

Ship.prototype.draw = function(c, guide) {
  c.save();
  c.translate(this.x, this.y);
  c.rotate(this.angle);
  c.strokeStyle = 'white';
  c.lineWidth = 2;
  c.fillStyle = 'black';
  draw_ship(c, this.radius, {guide, thruster: this.thruster_on});
  c.restore();
};

Ship.prototype.update = function(elapsed, c) {
  this.push(this.angle, this.thruster_on * this.thruster_power, elapsed);
  this.twist(
    (this.right_thruster - this.left_thruster) * this.steering_power,
    elapsed
  );
  Mass.prototype.update.apply(this, arguments);
};

// Projectile Class
function Projectile(mass, lifetime, x, y, x_speed, y_speed, rotation_speed) {
  const density = 0.001; // low density means we can see very light projectiles
  const radius = Math.sqrt(mass / density / Math.PI);
  this.super(x, y, mass, radius, 0, x_speed, y_speed, rotation_speed);
  this.lifetime = lifetime;
  this.life = 1.0;
}
extend(Projectile, Mass);

Projectile.prototype.update = function(elapsed) {
  this.life -= elapsed / this.lifetime;
  Mass.prototype.update.apply(this, arguments);
};

// Pacman
/*
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

Ghost.prototype.update = function(target, elapsed) {
  const angle = Math.atan2(target.y - this.y, target.x - this.x);
  const x_speed = Math.cos(angle) * this.speed;
  const y_speed = Math.sin(angle) * this.speed;
  this.x += x_speed * elapsed;
  this.y += y_speed * elapsed;
};
*/
