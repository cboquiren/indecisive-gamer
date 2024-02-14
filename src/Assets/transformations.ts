const capitalize = (word: string) => {
  const wordArr = word.split('');
  return wordArr[0].toUpperCase() + wordArr.slice(1).join('');
}

// Fisher-Yates Sorting Algorithm
const shuffle = <T>(arr: T[]): T[] => {
  for(let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i +1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const Transform = {
  capitalize,
  shuffle
}