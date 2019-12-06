const rec = n => {
  if (n == 1) return 1;
  else return n * rec(n - 1);
};

const maxArr = (a, max, i) => {
  if (a.length == 1) return a[0];
  if (i == a.length) {
    return max;
  } else {
    if (max < a[i]) {
      max = a[i];
    }
    return maxArr(a, max, ++i);
  }
};
const arr = [5, 44, 6, 8, 88];

console.log(maxArr(arr, arr[0], 0));
