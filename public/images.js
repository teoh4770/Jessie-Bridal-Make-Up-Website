export async function imagesJSONData(url) {
  const response = await fetch(url);
  const jsonData = await response.json();

  // return arr;
  let arr = jsonData.map(function (post) {
    return {
      image: post.mediaUrl,
      url: post.permalink,
    };
  });

  return arr;
}
