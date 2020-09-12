var value = 30;
var array = [];
var sorting = false;
var loopdeloop;
var delay = 80;
var states = [];
var sorted = false;

function updateValue(val) {
  value = val;
  document.getElementById("value").innerHTML = value;
}

function updateDelay(del) {
  delay = parseInt(del);
  document.getElementById("delay").innerHTML = delay;
}

function newArr(len) {
  sorting = false;

  clearInterval(loopdeloop);

  var length = len || value;
  
  array = [];
  for (var i = 0; i < length; i++) {
    var height = ((canvas.height - 20) / length) * (i+1);
    array.push(height);
    states.push(0);
  }

  document.getElementById('subtitle').innerHTML = 'Select a sort to begin';
  console.log('Created new array with length:', length);
  randomize();

  sorted = false;
}

function randomize() {

  // for entire array
  for (var i = 0; i < array.length; i++) {
    // pick random index
    var random = Math.floor( Math.random() * array.length );
    // swap
    swap(i, random);
  }

  draw();
}

function sortBy(type) {
  clearInterval(loopdeloop);

  if (sorting == false && sorted == false) {
    if (type == 'bubble') {
      bubbleSort();
    } else if (type == 'selection') {
      selectionSort();
    } else if (type == 'insertion') {
      insertionSort();
    } else if (type == 'merge') {
      initMerge();
    } else if (type == 'quick') {
      initQuick();
    } else if (type == 'bogo') {
      bogoSort();
    }
  } else if (sorted == true) {
    document.getElementById('subtitle').innerHTML = "Remember to create a new array before you sort again!";
  }
}

function swap(a, b) {
  var temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

function resetStates() {
  for (var i = 0; i < states.length; i++) {
    states[i] = 0;
  }
  draw();
}