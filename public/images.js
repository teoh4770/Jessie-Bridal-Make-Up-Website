export async function importImages(url) {
  const response = await fetch(url);
  const jsonData = await response.json();

  /**
   * {
   *  image: image.url,
   *  url: instagramPost.link
   * }
   */
  let arr = jsonData.map(function (post) {
    return {
      image: post.mediaUrl,
      url: post.permalink,
    };
  });

  return arr;
}