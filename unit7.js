const fs = require("fs");

let bubbleSort = (inputArr) => {
  let len = inputArr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (Number(inputArr[j]) > Number(inputArr[j + 1])) {
        let tmp = inputArr[j];
        inputArr[j] = inputArr[j + 1];
        inputArr[j + 1] = tmp;
      }
    }
  }
};

function partition(arr, low, high) {
  let temp;
  let pivot = arr[high];

  // index of smaller element
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller
    // than or equal to pivot
    if (arr[j] <= pivot) {
      i++;

      // swap arr[i] and arr[j]
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  // swap arr[i+1] and arr[high]
  // (or pivot)

  temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;

  return i + 1;
}

function quickSortIterative(arr) {
  let l = 0;
  let h = arr.length - 1;
  let stack = new Array(h - l + 1);
  stack.fill(0);

  let top = -1;
  stack[++top] = l;
  stack[++top] = h;

  while (top >= 0) {
    h = stack[top--];
    l = stack[top--];
    let p = partition(arr, l, h);

    if (p - 1 > l) {
      stack[++top] = l;
      stack[++top] = p - 1;
    }
    if (p + 1 < h) {
      stack[++top] = p + 1;
      stack[++top] = h;
    }
  }
}

function merge(left, right) {
  let arr = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  return [...arr, ...left, ...right];
}

function mergeSort(array) {
  const half = array.length / 2;

  if (array.length < 2) {
    return array;
  }

  const left = array.splice(0, half);
  return merge(mergeSort(left), mergeSort(array));
}

/* Function to print an array */
function printArray(arr, size) {
  var i;
  fs.appendFileSync("out.txt", "\n", function (err) {
    if (err) {
      return console.log(err);
    }
  });
  for (i = 0; i < size; i++) {
    fs.appendFileSync("out.txt", arr[i] + "\n", function (err) {
      if (err) {
        return console.log(err);
      }
    });
  }
}

const myArgs = process.argv.slice(2);

fs.writeFile("out.txt", "", function (err) {
  if (err) {
    return console.log(err);
  }
});

for (let f = 0; f < myArgs.length; f = f + 1) {
  var array = fs.readFileSync(myArgs[f]).toString().split("\n");
  var array2 = fs.readFileSync(myArgs[f]).toString().split("\n");
  var array3 = fs.readFileSync(myArgs[f]).toString().split("\n");
  array.pop();
  array2.pop();
  array3.pop();

  console.time("bubblesort " + myArgs[f]);
  bubbleSort(array);
  console.timeEnd("bubblesort " + myArgs[f]);
  printArray(array, array.length);

  console.time("quickSort " + myArgs[f]);
  quickSortIterative(array2);
  console.timeEnd("quickSort " + myArgs[f]);
  printArray(array2, array2.length);

  console.time("mergeSort " + myArgs[f]);
  const mergedArray = mergeSort(array3);
  console.timeEnd("mergeSort " + myArgs[f]);
  printArray(mergedArray, mergedArray.length);
}
