const TABLETVIEW = 650;
// initial state of the animation
window.onload = function () {
  if (window.outerWidth >= TABLETVIEW) {
    gsap.set(".hero__heading > h1, .hero__subheading", {
      opacity: 0,
      x: 100,
    });
    gsap.set(".hero__image", { opacity: 0, scale: 1.1 });

    let time = 1.5;
    gsap.to(".hero__image", { duration: time, opacity: 1, scale: 1 });
    gsap.to(".hero__heading > h1, .hero__subheading", {
      duration: time,
      opacity: 1,
      x: 0,
      stagger: 0.1,
    });
  }
};
