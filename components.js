class App {
  constructor() {
    this.index = "";
    this.newScrollPosition = 0;
    this.lastScrollPosition;
    this.imagesCount = 20;

    // $ indicates that this is an element, not a variable
    this.$navDesktop = document.querySelector(".navbar--desktop");
    this.$navMobile = document.querySelector(".navbar--mobile");
    this.$menu = document.querySelector(".menu");
    this.$menuBtn = document.querySelector(".navbar__button");
    this.$faqItems = document.querySelectorAll(".faq__item");
    this.$faq = document.querySelector(".faq");
    this.$gallery = document.querySelector(".gallery__grid");

    this.addIndex(this.$faqItems);
    this.addEventListeners();
    this.addImages();
  }

  addEventListeners() {
    window.addEventListener("scroll", this.debounce(this.autoHideHeader, 50));

    if (this.$faq) {
      this.$faq.addEventListener("click", (event) => {
        this.openQuestionCard(event);
      });
    }

    this.$menuBtn.addEventListener("click", () => {
      const isExpanded =
        this.$navMobile.getAttribute("aria-expanded") === "true";
      const shouldClose = isExpanded ? false : true;
      this.$navMobile.setAttribute("aria-expanded", shouldClose);
    });
  }

  openQuestionCard(event) {
    const $faqItem = event.target.closest(".faq__item");
    const selectedIndex = $faqItem.dataset.id;

    this.$faqItems.forEach((item) => {
      item.setAttribute("aria-expanded", false);
    });

    if (this.index !== selectedIndex) {
      this.index = selectedIndex;
      $faqItem.setAttribute("aria-expanded", true);
    } else {
      this.index = "";
      $faqItem.setAttribute("aria-expanded", false);
    }
  }

  autoHideHeader() {
    this.lastScrollPosition = window.scrollY;
    // scroll down
    if (
      this.newScrollPosition < this.lastScrollPosition &&
      this.lastScrollPosition > 80
    ) {
      this.$navDesktop.classList.remove("slideDown");
      this.$navDesktop.classList.add("slideUp");

      // scroll up
    } else if (this.newScrollPosition > this.lastScrollPosition) {
      this.$navDesktop.classList.add("slideDown");
      this.$navDesktop.classList.remove("slideUp");
    }

    this.newScrollPosition = this.lastScrollPosition;
  }

  // helper method
  addIndex(listOfElements) {
    listOfElements.forEach((element, key) => {
      element.dataset.id = key;
    });
  }

  debounce(func, timeout = 200) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  addImages() {
    const fragment = new DocumentFragment();
    for (let i = 1; i <= this.imagesCount; i++) {
      const content = document.createElement("div");
      content.classList.add("content", "flow");

      const image = document.createElement("img");
      image.alt = "photo";
      image.src = `../assets/jessie_photos/portfolio-img${i}.webp`;
      content.appendChild(image);
      fragment.appendChild(content);
    }

    this.$gallery.append(fragment);
  }
}

new App();
