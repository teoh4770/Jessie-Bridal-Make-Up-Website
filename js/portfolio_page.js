const gallery = document.querySelector(".gallery__grid");
const imagesCount = 20;
// need to figure out how to dynamically count the images

const fragment = new DocumentFragment();
for (let i = 1; i <= imagesCount; i++) {
  const content = document.createElement("div");
  content.classList.add("content", "flow");

  const image = document.createElement("img");
  image.alt = "photo";
  image.src = `../assets/jessie_photos/portfolio-img${i}.webp`;
  content.appendChild(image);
  fragment.appendChild(content);
}

gallery.append(fragment);
