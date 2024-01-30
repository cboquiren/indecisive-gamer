const capitalize = (word: string) => {
  const wordArr = word.split('');
  return wordArr[0].toUpperCase() + wordArr.slice(1).join('');
}

export const Transform = {
  capitalize
}