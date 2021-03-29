// Author: Michael Berge
// Date: 3/29/2021

var numElements;
var values = [];
var pause;
var sortingFunctions = [];
var numElementsSlider, speedSlider;
var bubbleSortCount = 0;
var insertionSortCount = 1;
var selectionSortCount = 0;
var isSorted;

//////////////////////////////////////////////////////////////
///////////////////////// SETUP ETC. /////////////////////////
//////////////////////////////////////////////////////////////

function setup() {
  createCanvas(960, 540); 
  frameRate(120);
  
  sortingAlgSlider = createSlider(0, 2, 0);
  sortingAlgSlider.position(20, 20);
  numElementsSlider = createSlider(50, 1000, 50, 10);
  numElementsSlider.position(20, 40);
  speedSlider = createSlider(1, 10, 10);
  speedSlider.position(20, 60);
  
  numElements = 100;
  reset();
  
  sortingFunctions.push(selectionSort);
  sortingFunctions.push(bubbleSort);
  sortingFunctions.push(insertionSort);
}

function reset() {
  values = [];
  
  numElements = numElementsSlider.value();
  let h = height/numElements;
  for (let i = 0; i < numElements; i++) {
    values.push(h);
    h += height/numElements/1.5;
  }
  
  shuffleBars();
  pause = true;
  
  bubbleSortCount = 0;
  insertionSortCount = 1;
  selectionSortCount = 0;
  
  isSorted = false;
}

function shuffleBars() {
  let count = 0
  while (count < 10 * numElements) {
    let idx1 = floor(random(numElements));
    let idx2 = floor(random(numElements));
    
    let temp = values[idx1];
    values[idx1] = values[idx2];
    values[idx2] = temp;
    
    count++; 
  }
}

function printBars() {  
  for (let i = 0; i < values.length; i++) {
    fill(240);
    stroke(240);
    strokeWeight(2);
    
    let w = width/numElements;
    let h = values[i];
    let x = i * (width/numElements);
    let y = height - h;
    
    rect(x, y, w, h, 2);
  }
}

function keyPressed() {
    // Spacebar to pause
    if (keyCode === 32) {
      pause = !pause;
    }
    // Any key to reset
    else {
      reset();
    }
}

//////////////////////////////////////////////////////////////
///////////////////// SORTING ALGORITHMS /////////////////////
//////////////////////////////////////////////////////////////

function selectionSort() {
  let smallest = height;
  let idx;
  
  for (let i = selectionSortCount; i < values.length; i++) {
    if (values[i] < smallest) {
      smallest = values[i];
      idx = i;
    }
  }
  
  let temp = values[selectionSortCount];
  values[selectionSortCount] = values[idx];
  values[idx] = temp;
  
  if (selectionSortCount < values.length) {
    selectionSortCount++;      
  }
  else {
    isSorted = true;
  }
}

//////////////////////////////////////////////////////////////


function bubbleSort() {
  for (let i = 0; i < values.length-bubbleSortCount-1; i++) {
    if (values[i] > values[i+1]) {
      let temp = values[i];
      values[i] = values[i+1];
      values[i+1] = temp;
    }
  }
  if (bubbleSortCount < values.length) {
    bubbleSortCount++;      
  }
  else {
    isSorted = true;
  }
}

//////////////////////////////////////////////////////////////

function insertionSort() {
  for (let i = insertionSortCount; i > 0; i--) {
    if (values[i] < values[i-1]) { 
      let temp = values[i];
      values[i] = values[i-1];
      values[i-1] = temp;
    }
  }
  if (insertionSortCount < values.length) {
    insertionSortCount++;      
  }
  else {
    isSorted = true;
  }
}

//////////////////////////////////////////////////////////////
///////////////////////// DRAW LOOP //////////////////////////
//////////////////////////////////////////////////////////////

function draw() {
  if (frameCount % (101 - (10 * speedSlider.value())) === 0) {
    background(25);
    printBars();

    if (numElements - numElementsSlider.value() != 0) {
      reset();
    }
    if (!pause) { 
      if (!isSorted) {
        sortingFunctions[sortingAlgSlider.value()]();
      }
      
      fill(240, 240, 240);
      noStroke();
      triangle(915, 25, 934, 35, 915, 45);
    }
    else {
      ellipseMode(CENTER);
      fill(240, 240, 240);
      noStroke();
      rect(915, 25, 7, 20, 1);
      rect(927, 25, 7, 20, 1);
    }

    // Text
    textAlign(LEFT, CENTER);
    textSize(12);
    stroke(240);
    strokeWeight(0.5);

    let sortingAlgName;
    switch (sortingAlgSlider.value()) {
      case 0:
        sortingAlgName = "Selection Sort";
        break;
      case 1:
        sortingAlgName = "Bubble Sort";
        break;
      case 2:
        sortingAlgName = "Insertion Sort";
        break;
    }
    
    text("Sorting Algorithm: ",     165, 30);
    text(sortingAlgName,            265, 30);
    text("Number of elements:",     165, 50);
    text(numElementsSlider.value(), 280, 50);
    text("Speed: ",                 165, 70);
    text(speedSlider.value(),       205, 70);
    
    textSize(32);
    text("Press spacebar to play/pause", 360, 35);
    text("Press any key to reset",       360, 65);
  }
}