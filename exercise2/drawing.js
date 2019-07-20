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

function draw_line(ctx) {
  ctx.beginPath();
  ctx.strokeStyle = '#FFF';
  ctx.fillStyle = '#00FF00';
  ctx.lineWidth = 2;
  ctx.moveTo(50, 50);
  ctx.lineTo(150, 250);
  ctx.lineTo(250, 170);
  ctx.lineTo(320, 280);
  // This will add a line from the current path position to the most recent open end.
  ctx.closePath();
  ctx.stroke();
  ctx.fillText('(50,50)', 30, 40);
  ctx.fillText('(150, 250)', 130, 260);
  ctx.fillText('(250, 170)', 255, 175);
  ctx.fillText('(320, 280)', 325, 285);
}

function draw_shapes(ctx) {
  ctx.beginPath();
  ctx.moveTo(50, 250);
  ctx.lineTo(50, 350);
  ctx.lineTo(150, 350);
  ctx.closePath();
  ctx.moveTo(230, 360);
  ctx.lineTo(270, 360);
  ctx.lineTo(270, 310);
  ctx.closePath();
  ctx.moveTo(250, 50);
  ctx.lineTo(370, 50);
  ctx.lineTo(370, 100);
  ctx.closePath();
  ctx.strokeStyle = '#FFFF00';
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.stroke();
}

function draw_curves(ctx) {
  ctx.beginPath();
  ctx.moveTo(50, 250);
  // requires the coordinates of a control point as well as of the end point.
  // The line will curve towards the control point.
  ctx.quadraticCurveTo(25, 300, 50, 350);
  ctx.quadraticCurveTo(100, 375, 150, 350);
  ctx.closePath();
  ctx.moveTo(230, 360);
  ctx.quadraticCurveTo(255, 340, 270, 360);
  ctx.quadraticCurveTo(255, 340, 270, 310);
  ctx.closePath();
  ctx.moveTo(250, 50);
  ctx.quadraticCurveTo(310, 60, 370, 50);
  ctx.quadraticCurveTo(400, 75, 370, 100);
  ctx.closePath();
  ctx.strokeStyle = '#FFFF00';
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.stroke();
}

function draw_bezier_curve(ctx) {
  ctx.beginPath();
  ctx.strokeStyle = '#FFF';
  ctx.fillStyle = '#00FF00';
  ctx.lineWidth = 2;
  ctx.moveTo(50, 50);
  // Bezier curves take the coordinates of two control points plus the end point.
  // The resultant path is a curve which passes through each of the specified end points.
  // Bezier curves allow for smooth twisting and turning with relatively simple paths.
  ctx.bezierCurveTo(0, 0, 80, 250, 150, 250);
  ctx.bezierCurveTo(250, 250, 250, 250, 250, 170);
  ctx.bezierCurveTo(250, 50, 400, 350, 320, 280);
  // This will add a line from the current path position to the most recent open end.
  ctx.closePath();
  ctx.stroke();
  ctx.fillText('(50,50)', 30, 40);
  ctx.fillText('(150, 250)', 130, 260);
  ctx.fillText('(250, 170)', 255, 175);
  ctx.fillText('(320, 280)', 325, 285);
}
