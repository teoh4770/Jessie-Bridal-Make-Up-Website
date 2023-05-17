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
    this.$menuItems = document.querySelectorAll(".menu__item > a");
    this.$faqItems = document.querySelectorAll(".faq__item");
    this.$faq = document.querySelector(".faq");

    this.addAnimation();
    this.addIndex(this.$faqItems);
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener("scroll", this.debounce(this.autoHideHeader, 15));

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

    this.$menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        this.$navMobile.setAttribute("aria-expanded", "false");
      });
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

  addAnimation() {
    const appearOption = {
      threshold: 0.5,
    };

    const animateObjs = document.querySelectorAll(".animatedObj");
    const servicesCards = document.querySelectorAll(".services__card");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        let element = entry.target;
        if (entry.isIntersecting) {
          element.classList.add("animate");
        }
      });
    }, appearOption);
    animateObjs.forEach((obj) => observer.observe(obj));

    const servicesCardsObserver = new IntersectionObserver((entries, self) => {
      // get an array of the visible cards
      let targets = entries.map((entry) => {
        if (entry.isIntersecting) {
          self.unobserve(entry.target);
          return entry.target;
        }
      });

      gsap.to(targets, {
        x: 0,
        opacity: 1,
        stagger: 0.1,
      });
    });

    servicesCards.forEach((card) => {
      gsap.set(card, {
        x: 50,
        opacity: 0,
      });
      servicesCardsObserver.observe(card);
    });
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
