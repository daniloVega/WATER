import '../scss/style.scss';

const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const dropdownToggle = document.querySelector('.dropdown__toggle');
const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
const menuLinks = document.querySelectorAll(
  '.menu__list--item a:not(.dropdown__toggle)'
);
const dropdown = document.querySelector('.dropdown');
const toggleMenu = (element, className) => element.classList.toggle(className);

hamburger.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleMenu(hamburger, 'open');
  toggleMenu(menu, 'open');
});

dropdownToggle.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  const dropdown = document.querySelector('.dropdown');
  dropdown.classList.toggle('active');
});

// Handle dropdown link click
dropdownLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.stopPropagation();
    const parentDropdown = link.closest('.dropdown');
    if (parentDropdown) parentDropdown.classList.remove('active');
    hamburger.classList.remove('open');
    menu.classList.remove('open');
  });
});

menuLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.stopPropagation();
    hamburger.classList.remove('open');
    menu.classList.remove('open');
  });
});
document.addEventListener('click', (event) => {
  if (
    !dropdown.contains(event.target) &&
    !dropdownToggle.contains(event.target)
  ) {
    dropdown.classList.remove('active');
  }
});

menu.addEventListener('click', (event) => event.stopPropagation());

// BENEFITS LOGIC

const items = document.querySelectorAll('.benefits__item');
items.forEach((item, index) => {
  if (index === 0) {
    item.classList.add('benefits__item--expanded');
    item.classList.remove('benefits__item--collapsed');
  } else {
    item.classList.add('benefits__item--collapsed');
    item.classList.remove('benefits__item--expanded');
  }
});
items.forEach((item) => {
  item
    .querySelector('.benefits__header')
    .addEventListener('click', function () {
      const isExpanded = item.classList.contains('benefits__item--expanded');

      items.forEach((el) => el.classList.remove('benefits__item--expanded'));
      items.forEach((el) => el.classList.add('benefits__item--collapsed'));

      if (!isExpanded) {
        item.classList.add('benefits__item--expanded');
        item.classList.remove('benefits__item--collapsed');
      }
    });
});
