const capitalize = string => {
  const stringToArray = string.split(' ');
  return stringToArray.map(letter => {
    const firstLetter = letter.charAt(0).toUpperCase();
    const otherLetters = letter.slice(1);
    return firstLetter + otherLetters;
  })
}

export default capitalize;