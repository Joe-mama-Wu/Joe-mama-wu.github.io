'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Get the modal
var modal = document.getElementById("myModal");



// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

    // Re-trigger scroll reveal for new page
    revealVisible();

  });
}



// ---- TYPEWRITER EFFECT ----

const typedTitles = [
  'Robotics Actuation Engineer',
  'Product Development Engineer',
  'Deep Learning | RL | VLA',
  'Automotive Powertrain',
  'BLDC Motor Systems'
];

const titleEl = document.getElementById('typed-title');
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Create cursor element
const cursor = document.createElement('span');
cursor.className = 'typed-cursor';
titleEl.insertAdjacentElement('afterend', cursor);

function typeTitle() {
  const current = typedTitles[titleIndex];

  if (isDeleting) {
    titleEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    titleEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    setTimeout(function () { isDeleting = true; typeTitle(); }, 2200);
    return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % typedTitles.length;
  }

  const speed = isDeleting ? 45 : 85;
  setTimeout(typeTitle, speed);
}

typeTitle();



// ---- SCROLL REVEAL ----

function revealVisible() {
  const revealItems = document.querySelectorAll('[data-reveal]');
  revealItems.forEach(function (el, i) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      setTimeout(function () { el.classList.add('visible'); }, i * 80);
    }
  });
}

// Attach data-reveal to animatable items
const revealTargets = document.querySelectorAll(
  '.service-item, .timeline-item, .skills-item, .project-item, .blog-post-item, .clients-item, .testimonials-item'
);
revealTargets.forEach(function (el) {
  el.setAttribute('data-reveal', '');
});

window.addEventListener('scroll', revealVisible);
revealVisible(); // run once on load



// ---- SKILL BAR ANIMATION ----

const skillFills = document.querySelectorAll('.skill-progress-fill');
skillFills.forEach(function (fill) {
  const targetWidth = fill.style.width || '0%';
  fill.dataset.targetWidth = targetWidth;
  fill.style.width = '0';
});

const skillObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const fill = entry.target;
      setTimeout(function () {
        fill.style.width = fill.dataset.targetWidth;
      }, 300);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(function (fill) { skillObserver.observe(fill); });