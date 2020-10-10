var value = 30;
var array = [];
var sorting = false;
var delay = 80;
var states = [];
var sorted = false;
var comparisons = 0;
var time = 0;
var algorithm;
var timer = setInterval(() => {
  if (sorting) time++;
}, 1);

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
  if (sorting == false && sorted == false) {
    comparisons = 0;
    time = 0;
    if (type == 'bubble') {
      algorithm = "Bubble Sort";
      bubbleSort();
    } else if (type == 'selection') {
      algorithm = "Selection Sort";
      selectionSort();
    } else if (type == 'insertion') {
      algorithm = "Insertion Sort";
      insertionSort();
    } else if (type == 'merge') {
      algorithm = "Mergesort";
      initMerge();
    } else if (type == 'quick') {
      algorithm = "Quicksort";
      initQuick();
    } else if (type == 'bogo') {
      algorithm = "Bogosort";
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