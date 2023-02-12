export default function urlToFile(url) {
  if (!url) return null;
  return fetch(url)
    .then((res) => {
      // console.log(res);
      return res.blob();
    })
    .then((blob) => {
      const newImg = new File([blob], "image.png", { type: blob.type });
      // console.log(newImg);
      return newImg;
    });
}
