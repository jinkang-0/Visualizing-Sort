async function bubbleSort() {
  sorting = true;

  animate();

  // set subtitle
  document.getElementById('subtitle').innerHTML = 'Bubble Sort';

  // sort through array
  for (var j = 1; j < array.length; j++) {
    // move biggest to last
    for (var i = 0; i < array.length - j; i++) {
      if (array[i] > array[i+1]) {
        states[i] = 3;
        states[i+1] = 3;
        swap(i, i+1);
        await new Promise((resolve, reject) => setTimeout(resolve, delay * 2));
      }
      states[i] = 1;
      states[i+1] = 1;
      await new Promise((resolve, reject) => setTimeout(resolve, delay));
      states[i] = 0;
      states[i+1] = 0;
    }
  }

  // sorting complete
  sorting = false;
  sorted = true;
  draw();
}

async function selectionSort() {
  sorting = true;

  animate();

  // set subtitle
  document.getElementById('subtitle').innerHTML = 'Selection Sort';

  // sort through array (left to right)
  for (var i = 0; i < array.length; i++) {

    var min = array[i];
    var index = i;

    // find minimum
    for (var j = i; j < array.length; j++) {
      if (array[j] < min) {
        min = array[j];
        index = j;
      }
      states[index] = 2;
      states[j] = 1;
      await new Promise((resolve, reject) => setTimeout(resolve, delay));
      states[index] = 0;
      states[j] = 0;
    }

    // put min at current index, then loop again
    states[i] = 3;
    states[index] = 3;
    swap(i, index);
    await new Promise((resolve, reject) => setTimeout(resolve, delay * 2));
    states[i] = 0;
    states[index] = 0;
  }

  // sorting complete
  sorting = false;
  sorted = true;
  draw();
}

async function insertionSort() {
  sorting = true;

  animate();
  
  // set subtitle
  document.getElementById('subtitle').innerHTML = 'Insertion Sort';

  // sort through array starting at 1
  for (var i = 1; i < array.length; i++) {
    await new Promise((resolve, reject) => setTimeout(resolve, delay));
    // place smaller element behind i
    for (var j = i; j > 0; j--) {
      states[j] = 1;
      if (array[j] < array[j-1]) {
        // highlight
        states[j] = 3;
        states[j-1] = 3;

        swap(j, j-1);
        
        // pause to show swap
        await new Promise((resolve, reject) => setTimeout(resolve, delay));
        states[j-1] = 0;
      }
      // pause for trace
      await new Promise((resolve, reject) => setTimeout(resolve, delay));
      states[j] = 0;
    }
  }

  // sorting complete
  sorting = false;
  sorted = true;
  draw();
}

async function initMerge() {
  sorting = true;

  // set subtitle
  document.getElementById('subtitle').innerHTML = 'Merge Sort';

  // start animation
  animate();

  // start sorting
  var temp = array;
  await new Promise((resolve, reject) => {resolve( mergeSort(temp) )});
  array = temp;

  // sorting complete
  sorting = false;
  sorted = true;
  draw();
}

async function mergeSort(arr) {

  // return if length = 1
  if (arr.length <= 1) return; 

  // split in half
  var left = [];
  var right = [];

  for (var i = 0; i < Math.floor(arr.length/2); i++) {
    left.push(arr[i]);
  }

  for (var i = Math.floor(arr.length/2); i < arr.length; i++) {
    right.push(arr[i]);
  }

  // split
  await new Promise((resolve, reject) => {resolve( mergeSort(left) )});
  await new Promise((resolve, reject) => {resolve( mergeSort(right) )});

  // merge & sort
  await new Promise((resolve, reject) => {resolve( merge(left, right, arr) )});

}

async function merge(left, right, arr) {

  var a = 0;
  var start = array.indexOf(left[0]);

  // compare
  while (left[0] && right[0]) {
    if (left[0] < right[0]) {
      array[start+a] = left[0];
      arr[a] = left[0];
      left.shift();

      // highlight
      states[array.indexOf(arr[a])] = 2;
      await new Promise((resolve, reject) => setTimeout(resolve, delay));
      states[array.indexOf(arr[a])] = 0;

      a++;
    } else {
      array[start+a] = right[0];
      arr[a] = right[0];
      right.shift();
      
      // highlight
      states[array.indexOf(arr[a])] = 2;
      await new Promise((resolve, reject) => setTimeout(resolve, delay));
      states[array.indexOf(arr[a])] = 0;

      a++;
    }
  }

  // add missing
  while (left[0]) {
    array[start+a] = left[0];
    arr[a] = left[0];
    left.shift();
    
    states[array.indexOf(arr[a])] = 2;
    await new Promise((resolve, reject) => setTimeout(resolve, delay));
    states[array.indexOf(arr[a])] = 0;

    a++;
  }

  while (right[0]) {
    array[start+a] = right[0];
    arr[a] = right[0];
    right.shift();
    
    states[array.indexOf(arr[a])] = 2;
    await new Promise((resolve, reject) => setTimeout(resolve, delay));
    states[array.indexOf(arr[a])] = 0;

    a++;
  }

}

async function initQuick() {
  sorting = true;

  // set subtitle
  document.getElementById('subtitle').innerHTML = 'Quick Sort';

  // start animation
  animate();
  
  // start sorting
  await new Promise((resolve, reject) => {resolve( quickSort(0, array.length-1) )});
  
  // sorting complete
  sorting = false;
  sorted = true;
  draw();
}

async function quickSort(start, end) {

  // if start index < end index, keep partitioning
  if (start < end) {
    var pivot = await new Promise((resolve, reject) => {resolve( partition(start, end) )});
    await new Promise((resolve, reject) => {resolve( quickSort(start, pivot-1) )});
    await new Promise((resolve, reject) => {resolve( quickSort(pivot+1, end) )});
  }

}

async function partition(start, end) {

  // mark end
  states[end] = 2;

  var index = start-1;

  // from start to end, sort left lower than end value, right higher than end value
  for (var i = start; i < end; i++) {
    
    // looping indicator
    states[i] = 1;
    
    if (array[i] <= array[end]) {
      index++;
      
      // highlight swap
      states[i] = 3;
      states[index] = 3;
      
      swap(index, i);

      await new Promise((resolve, reject) => setTimeout(resolve, delay));
    }

    // pause to highlight
    await new Promise((resolve, reject) => setTimeout(resolve, delay));
    states[i] = 0;
    states[index] = 0;
  }

  // highlight end swap
  states[index+1] = 3;
  states[end] = 3;

  // place pivot in between
  swap(index+1, end);
  
  await new Promise((resolve, reject) => setTimeout(resolve, delay * 2));
  states[index+1] = 0;
  states[end] = 0;

  // return pivot point
  return index+1;

}

function bogoSort() {

  // set subtitle
  document.getElementById('subtitle').innerHTML = 'Bogosort';

  var length = array.length;

  // randomize array
  loopdeloop = setInterval(() => {
    randomize();
    
    // if sorted, stop loop
    for (var i = 0; i < length-1; i++) {
      if (array[i] > array[i+1]) {
        break;
      } else if (i == length-2) {
        console.log("IT WORKS!?");
        clearInterval(loopdeloop);
      }
    }

  }, delay);

}