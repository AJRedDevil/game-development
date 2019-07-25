function draw_grid({
  ctx,
  major,
  minor = 10,
  stroke = '#00FF00',
  fill = '#009900',
}) {
  const finalMajor = major || minor * 5;
  ctx.save();
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  let width = ctx.canvas.width;
  let height = ctx.canvas.height;

  for (let x = 0; x < width; x += minor) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.lineWidth = x % finalMajor == 0 ? 0.5 : 0.25;
    ctx.stroke();
    if (x % finalMajor == 0) {
      ctx.fillText(x, x, 10);
    }
  }
  for (let y = 0; y < height; y += minor) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.lineWidth = y % finalMajor == 0 ? 0.5 : 0.25;
    ctx.stroke();
    if (y % finalMajor == 0) {
      ctx.fillText(y, 0, y + 10);
    }
  }
  ctx.restore();
}

function draw_pacman(ctx, radius, mouth) {
  angle = 0.2 * Math.PI * mouth;
  ctx.save();
  ctx.fillStyle = 'yellow';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(0, 0, radius, angle, 2 * Math.PI - angle);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function draw_ghost(ctx, radius, options = {}) {
  const feet = options.feet || 4;
  const head_radius = radius * 0.8;
  const foot_radius = head_radius / feet;
  ctx.save();
  ctx.strokeStyle = options.stroke || 'white';
  ctx.fillStyle = options.fill || 'red';
  ctx.lineWidth = options.lineWidth || radius * 0.05;
  ctx.beginPath();
  for (foot = 0; foot < feet; foot++) {
    ctx.arc(
      2 * foot_radius * (feet - foot) - head_radius - foot_radius,
      radius - foot_radius,
      foot_radius,
      0,
      Math.PI
    );
  }
  ctx.lineTo(-head_radius, radius - foot_radius);
  ctx.arc(0, head_radius - radius, head_radius, Math.PI, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(
    -head_radius / 2.5,
    -head_radius / 2,
    head_radius / 3,
    0,
    2 * Math.PI
  );
  ctx.fill();
  ctx.beginPath();
  ctx.arc(head_radius / 3.5, -head_radius / 2, head_radius / 3, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(
    -head_radius / 2,
    -head_radius / 2.2,
    head_radius / 8,
    0,
    2 * Math.PI
  );
  ctx.fill();
  ctx.beginPath();
  ctx.arc(head_radius / 4, -head_radius / 2.2, head_radius / 8, 0, 2 * Math.PI);
  ctx.fill();

  ctx.restore();
}

function draw_asteroid(ctx, radius, shape, options = {}) {
  ctx.strokeStyle = options.stroke || 'white';
  ctx.fillStyle = options.fill || 'black';
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < shape.length; i++) {
    ctx.rotate((2 * Math.PI) / shape.length);
    ctx.lineTo(radius + radius * options.noise * shape[i], 0);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  if (options.guide) {
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 0.2;
    ctx.arc(0, 0, radius + radius * options.noise, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius - radius * options.noise, 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
}
