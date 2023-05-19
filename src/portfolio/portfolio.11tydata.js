const fg = require("fast-glob");
const galleryImages = fg.sync([
  "src/assets/jessie_photos/*.{jpg, jpeg, svg ,webp}",
]);

console.log("gobbling gallery images");
// console.log(galleryImages);

const gallery = [];
// strip the 'src' prefix from every gallery image
// (Note: I changed my 11ty Input folder to 'src')
for (let i = 0; i < galleryImages.length; i++) {
  let img = galleryImages[i];
  let shorterlinkImg = img.substring(3);
  gallery.push(shorterlinkImg);
}
gallery.sort((a, b) => a > b);
let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'})
gallery.sort(collator.compare);
console.log(gallery);


module.exports = function () {
  // finalizing gallery images
  return { gallery: gallery };
};
