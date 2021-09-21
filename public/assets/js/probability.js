const probability = (n, exp) => {
  let total_percentage = {
    value: 0,
    case: ''
  };
  switch (true) {
    case exp <= 50:
      total_percentage = { value: .3, case: 'add' }
      break;
    case (exp > 50 && exp <= 120):
      total_percentage = { value: .25, case: 'subtract' }
      break;
    case (exp > 120 && exp <= 150):
      total_percentage = { value: .4, case: 'subtract' }
      break;
    case (exp > 150 && exp <= 190):
      total_percentage = { value: .5, case: 'subtract' }
      break;
    case exp > 190:
      total_percentage = { value: .75, case: 'subtract' }
      break;
    default:
      break;
  }
  if (total_percentage.case === 'subtract') {
    return Math.random() <= (n - total_percentage.value);
  } else {
    return Math.random() <= (n + total_percentage.value);
  }
};

export default probability;
