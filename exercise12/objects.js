// Inheritance
function extend(ChildClass, ParentClass) {
  const parent = new ParentClass();
  ChildClass.prototype = parent;
  ChildClass.prototype.super = parent.constructor;
  ChildClass.prototype.constructor = ChildClass;
}

// Mass Class
function Mass(
  mass = 1,
  radius = 50,
  x,
  y,
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
  this.super(mass, radius, x, y, 0, x_speed, y_speed, rotation_speed);
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
function Ship(mass = 10, radius = 20, x, y, power, weapon_power = 200) {
  this.super(mass, radius, x, y, 1.5 * Math.PI);
  this.thruster_power = power;
  this.steering_power = this.thruster_power / 5;
  this.right_thruster = false;
  this.left_thruster = false;
  this.thruster_on = false;
  this.retro_on = false;
  this.weapon_power = weapon_power;
  this.loaded = false;
  this.weapon_reload_time = 0.25; // second
  this.time_until_reload = this.weapon_reload_time;
  this.compromised = false;
  this.max_health = 2.0;
  this.health = this.max_health;
}
extend(Ship, Mass);

Ship.prototype.draw = function(c, guide) {
  c.save();
  c.translate(this.x, this.y);
  c.rotate(this.angle);
  if (guide && this.compromised) {
    c.save();
    c.fillStyle = 'red';
    c.beginPath();
    c.arc(0, 0, this.radius, 0, 2 * Math.PI);
    c.fill();
    c.restore();
  }
  draw_ship(c, this.radius, {guide, thruster: this.thruster_on});
  c.restore();
};

Ship.prototype.update = function(elapsed, c) {
  this.push(
    this.angle,
    (this.thruster_on - this.retro_on) * this.thruster_power,
    elapsed
  );
  this.twist(
    (this.right_thruster - this.left_thruster) * this.steering_power,
    elapsed
  );
  // reload as necessary
  this.loaded = this.time_until_reload === 0;
  if (!this.loaded) {
    this.time_until_reload -= Math.min(elapsed, this.time_until_reload);
  }
  if (this.compromised) {
    this.health -= Math.min(elapsed, this.health);
  }
  Mass.prototype.update.apply(this, arguments);
};

Ship.prototype.projectile = function(elapsed) {
  const p = new Projectile(
    0.025,
    1,
    this.x + Math.cos(this.angle) * this.radius,
    this.y + Math.sin(this.angle) * this.radius,
    this.x_speed,
    this.y_speed,
    this.rotation_speed
  );
  p.push(this.angle, this.weapon_power, elapsed);
  this.push(this.angle + Math.PI, this.weapon_power, elapsed);
  this.time_until_reload = this.weapon_reload_time;
  return p;
};

// Projectile Class
function Projectile(mass, lifetime, x, y, x_speed, y_speed, rotation_speed) {
  const density = 0.001; // low density means we can see very light projectiles
  const radius = Math.sqrt(mass / density / Math.PI);
  this.super(mass, radius, x, y, 0, x_speed, y_speed, rotation_speed);
  this.lifetime = lifetime;
  this.life = 1.0;
}
extend(Projectile, Mass);

Projectile.prototype.draw = function(c, guide) {
  c.save();
  c.translate(this.x, this.y);
  c.rotate(this.angle);
  draw_projectile(c, this.radius, this.life, guide);
  c.restore();
};

Projectile.prototype.update = function(elapsed) {
  this.life -= elapsed / this.lifetime;
  Mass.prototype.update.apply(this, arguments);
};

// Indicator Class
function Indicator(label, x, y, width, height) {
  this.label = label + ': ';
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Indicator.prototype.draw = function(c, max, level) {
  c.save();
  c.strokeStyle = 'white';
  c.fillStyle = 'white';
  c.font = this.height + 'pt Arial';
  const offset = c.measureText(this.label).width;
  c.fillText(this.label, this.x, this.y + this.height - 1);
  c.beginPath();
  c.rect(offset + this.x, this.y, this.width, this.height);
  c.stroke();
  c.beginPath();
  c.rect(offset + this.x, this.y, this.width * (max / level), this.height);
  c.fill();
  c.restore();
};
