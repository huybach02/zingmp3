export const getArraySlider = (start, end, length) => {
  const limit = start > end ? length : end;
  let output = [];
  for (let i = start; i <= limit; i++) {
    output.push(i);
  }
  if (start > end || start <= end) {
    for (let i = 0; i <= end; i++) {
      output.push(i);
    }
  }
  return output;
};

// lenght 5
// 0 1 2 3 4 5
// 1 2 3 4 5 0
// 2 3 4 5 0 1
// 3 4 5 0 1 2
// 4 5 0 1 2 3
// 5 0 1 2 3 4
// 0 1 2 3 4 5

//0 1 2
//1 2
