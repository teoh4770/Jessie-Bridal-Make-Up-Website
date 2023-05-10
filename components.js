class App {
  constructor() {
    this.index = "";

    // $ indicates that this is an element, not a variable
    this.$faqItems = document.querySelectorAll(".faq__item");
    this.$faq = document.querySelector(".faq");

    this.addIndex(this.$faqItems);
    this.addEventListeners();
  }

  addEventListeners() {
    this.$faq.addEventListener("click", (event) => {
      this.openQuestionCard(event);
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

  // helper method
  addIndex(listOfElements) {
    listOfElements.forEach((element, key) => {
      element.dataset.id = key;
    });
  }
}

new App();
