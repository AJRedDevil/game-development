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
  // These save and restore canvas state such as
  // context.lineWidth, context.strokeStyle, and context.fillStyle.
  // Using them in this way ensures that the canvas is restored to
  // its original state after the function is done.
  // This is good practice when writing drawing code.
  // It avoids side effects and allows the calling code to keep control
  // of the canvas context.
  ctx.restore();
}

function draw_ship_at_origin(
  ctx,
  radius,
  options = {
    guide: false,
    lineWidth: 2,
    stroke: 'white',
    fill: 'black',
    curve1: 0.25,
    curve2: 0.75,
  }
) {
  ctx.save();
  if (options.guide) {
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
  ctx.lineWidth = options.lineWidth;
  ctx.strokeStyle = options.stroke;
  ctx.fillStyle = options.fill;
  let angle = (options.angle || 0.5 * Math.PI) / 2;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  // here we have three curves
  ctx.quadraticCurveTo(
    Math.cos(angle) * radius * options.curve2,
    Math.sin(angle) * radius * options.curve2,
    Math.cos(Math.PI - angle) * radius,
    Math.sin(Math.PI - angle) * radius
  );
  ctx.quadraticCurveTo(
    -radius * options.curve1,
    0,
    Math.cos(Math.PI + angle) * radius,
    Math.sin(Math.PI + angle) * radius
  );
  ctx.quadraticCurveTo(
    Math.cos(-angle) * radius * options.curve2,
    Math.sin(-angle) * radius * options.curve2,
    radius,
    0
  );
  ctx.fill();
  ctx.stroke();
  // the guide drawing code is getting complicated
  if (options.guide) {
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(Math.cos(-angle) * radius, Math.sin(-angle) * radius);
    ctx.lineTo(0, 0);
    ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    ctx.moveTo(-radius, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(
      Math.cos(angle) * radius * options.curve2,
      Math.sin(angle) * radius * options.curve2,
      radius / 40,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      Math.cos(-angle) * radius * options.curve2,
      Math.sin(-angle) * radius * options.curve2,
      radius / 40,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.beginPath();
    ctx.arc(radius * options.curve1 - radius, 0, radius / 50, 0, 2 * Math.PI);
    ctx.fill();
  }
  ctx.restore();
}

function draw_ship({ctx, x, y, radius, options = {}}) {
  ctx.save();
  // optionally draw a guide showing the collision radius
  if (options.guide) {
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }

  // set some default values;
  ctx.lineWidth = options.lineWidth || 2;
  ctx.strokeStyle = options.stroke || 'white';
  ctx.fillStyle = options.fill || 'black';
  let angle = (options.angle || 0.5 * Math.PI) / 2;
  // draw the ship in three lines
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  // Basically all you will need to know for now is that the sine and
  // cosine functions allow the (x, y) coordinates to be calculated from
  // a distance(a radius) and a direction(an angle).
  // In JavaScript, there are two corresponding methods of the Math object:
  // Math.sin(θ) and Math.cos(θ).
  // With these, we can calculate the x - and y - coordinates relative to
  // the center of the circle for any given angle, θ.
  // To convert an angle and a distance to x - and y - coordinates,
  // simply multiply these values by the distance you need(the radius of the circle).
  ctx.lineTo(
    x + Math.cos(Math.PI - angle) * radius,
    y + Math.sin(Math.PI - angle) * radius
  );
  ctx.lineTo(
    x + Math.cos(Math.PI + angle) * radius,
    y + Math.sin(Math.PI + angle) * radius
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}
