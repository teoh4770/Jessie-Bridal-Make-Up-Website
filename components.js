class App {
  constructor() {
    this.index = "";
    this.newScrollPosition = 0;
    this.lastScrollPosition;

    // $ indicates that this is an element, not a variable
    this.$navDesktop = document.querySelector(".navbar--desktop");
    this.$navMobile = document.querySelector(".navbar--mobile");
    this.$menu = document.querySelector(".menu");
    this.$menuBtn = document.querySelector(".navbar__button");
    this.$faqItems = document.querySelectorAll(".faq__item");
    this.$faq = document.querySelector(".faq");

    this.addIndex(this.$faqItems);
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener("scroll", this.debounce(this.autoHideHeader, 50));

    this.$faq.addEventListener("click", (event) => {
      this.openQuestionCard(event);
    });

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
    console.log(this.lastScrollPosition);
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
}

new App();
