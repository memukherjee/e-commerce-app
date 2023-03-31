export default function arrayToString(array) {
  if (array.length === 0) return null;
  let string = "";
  array.forEach((element) => {
    string += element + ",";
  });
  return string.slice(0, string.length - 1);
}
