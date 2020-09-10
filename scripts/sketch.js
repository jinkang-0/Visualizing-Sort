var canvas = document.querySelector("canvas");
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 100;
  draw();
})

newArr();

function draw() {
  var width = canvas.width / array.length;
  
  c.clearRect(0, 0, canvas.width, canvas.height);

  // draw rectangles
  for (var i = 0; i < array.length; i++) {
    
    // color code
    // 0 = n/a
    // 1 = looping
    // 2 = selected
    // 3 = swapping
    // 4 = special
    if (states[i] == 1) {
      c.fillStyle = "blue";
    } else if (states[i] == 2) {
      c.fillStyle = "purple";
    } else if (states[i] == 3) {
      c.fillStyle = "yellow";
    } else if (states[i] == 4) {
      c.fillStyle = "green";
    } else {
      c.fillStyle = "black";
    }

    c.fillRect(i * width, canvas.height - array[i], width, array[i]);
  }
}

function animate() {
  
  draw();

  if (sorting == true) requestAnimationFrame(animate);
}