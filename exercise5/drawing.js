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
    ctx.arc(0, 0, radius + radius * noise, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius - radius * noise, 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
}
