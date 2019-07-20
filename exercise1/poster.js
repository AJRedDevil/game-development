// calls the getElementById method on the global document object.
// The document object is defined automatically and provides a
// programmable interface into the entire HTML document.
const canvas = document.getElementById('asteroids');
// Canvas contexts provide an API for drawing.
// We’re accessing the "2d" canvas context.
// It has a variety of methods for drawing lines
// and shapes on the canvas and for transforming the canvas.
const context = canvas.getContext('2d');
// Setting context.strokeStyle affects the color of the line,
// here we set it to the built in 'dimgrey' color.
context.strokeStyle = 'lightgrey';
// context.fillStyle determines the color to use when filling drawn shapes (including fonts)
context.fillStyle = 'dimgrey';
// Setting context.lineWidth affects the thickness of the line, and
// here we set it to five pixels wide.
// When we set properties of the canvas context,
// they remain in force until we change them.
context.lineWidth = 5;
// specifies a rectangle using the context.rect method.
// (x,y) pixel coordinates of the origin of the rectangle
// The pixel width and height of the rectangle are specified in the last two arguments
// The rectangle specification is stored in memory as a structure known as a path.
context.rect(75, 50, canvas.width - 150, canvas.height - 100);
// To fill the path it’s necessary to call the context.fill method.
context.fill();
// tells the context to draw the stored path using the current values
// of the context properties (lineWidth and strokeStyle).
context.stroke();

context.font = '34px Arial';
// context.fillStyle = 'lightgrey';
// context.fillText('2D drawing', 110, 100);
context.strokeStyle = '#FF2222';
context.fillStyle = '#FFAAAA';
context.lineWidth = 0.75;
// This tells the context to use the central point in the text as the “anchor.”
// So, when we actually render the text, the central point in the
// text is positioned at the x-coordinate we provide rather than the default leftmost point.
context.textAlign = 'center';
const msg = '2D Drawing';
context.fillText(msg, canvas.width / 2, 100);
context.strokeText(msg, canvas.width / 2, 100);

// ********** Motivational Message **********
const msg2 = 'its quite easy';
context.font = '24px Arial';
context.fillText(msg2, canvas.width / 2, 330);
context.strokeText(msg2, canvas.width / 2, 330);

// *********** Stick Figure ***********
context.strokeStyle = '#FFF';
context.lineWidth = 2;
// The context.beginPath method begins a new path or resets the current path.
// We need to call this because we already had an active path left over
// from when we drew the original rectangle.
context.beginPath();
// This method can be used to draw any circle or portion of a circle.
// The method takes five arguments, as follows:
// the first pair of arguments includes the(x, y) coordinates(in pixels) of the center of the circle.
// The third argument is the radius of the circle, and
// the fourth and fifth arguments are the starting angle and
// finishing angle of the arc(measured in radians).
// To draw a full circle, these angles should be 0 and 2π.
context.arc(200, 140, 20, 0, Math.PI * 2);
// To move the “pen” to a location without drawing a line, call context.moveTo.
context.moveTo(200, 160);
// To draw a line from the current location to the given location, call context.lineTo.
context.lineTo(200, 220);
context.moveTo(180, 300);
context.lineTo(185, 260);
context.lineTo(200, 220);
context.lineTo(215, 260);
context.lineTo(220, 300);
context.moveTo(240, 130);
context.lineTo(225, 170);
context.lineTo(200, 170);
context.lineTo(175, 180);
context.lineTo(170, 220);
context.stroke();
