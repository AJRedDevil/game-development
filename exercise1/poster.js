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
context.lineWidh = 5;
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
context.lineWidh = 0.75;
// This tells the context to use the central point in the text as the “anchor.”
// So, when we actually render the text, the central point in the
// text is positioned at the x-coordinate we provide rather than the default leftmost point.
context.textAlign = 'center';
const msg = '2D Drawing';
context.fillText(msg, canvas.width / 2, 100);
context.strokeText(msg, canvas.width / 2, 100);
