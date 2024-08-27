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
	console.log('item', item);
	item.querySelector('.benefits__header').addEventListener(
		'click',
		function () {
			const isExpanded = item.classList.contains(
				'benefits__item--expanded'
			);
			console.log('clicked', isExpanded);
			items.forEach((el) =>
				el.classList.remove('benefits__item--expanded')
			);
			items.forEach((el) =>
				el.classList.add('benefits__item--collapsed')
			);
			if (!isExpanded) {
				item.classList.add('benefits__item--expanded');
				item.classList.remove('benefits__item--collapsed');
			}
		}
	);
});
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.benefits__item').forEach((item) => {
		item.addEventListener('click', function () {
			const targetId = this.getAttribute('id');
			const targetContent = document.querySelector(
				`.benefits__content-container .benefits__content-secondary#${targetId}`
			);
			if (targetContent) {
				document
					.querySelectorAll(
						'.benefits__content-container .benefits__content-secondary'
					)
					.forEach((content) => {
						content.classList.remove(
							'benefits__content-secondary--active'
						);
					});

				targetContent.classList.add(
					'benefits__content-secondary--active'
				);
			} else {
				console.error(`No content found with ID: ${targetId}`);
			}
		});
	});
});

// CAROUSEL LOGIC
const reviews = [
	{
		name: 'Mike Johnson',
		review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper molestie mi tempor aliquam. Etiam quis dolor scelerisque, laoreet justo vel, cursus purus. Phasellus commodo libero odio, sit amet gravida elit placerat eget.',
		image: './assets/images/user-3.png',
	},
	{
		name: 'John Doe',
		review: 'This product is amazing! I highly recommend it.',
		image: './assets/images/user-1.png',
	},
	{
		name: 'Jane Smith',
		review: 'Not what I expected, but still a good purchase.',
		image: './assets/images/user-2.png',
	}
];
let currentIndex = 0;
function updateCarousel() {
	document.querySelector('.carousel__description-text').textContent =
		reviews[currentIndex].review;
	document.querySelector(
		'.carousel__people-name'
	).textContent = `${reviews[currentIndex].name}`;
	document.querySelector('.carousel__people-img').src =
		reviews[currentIndex].image;

	document.getElementById('prev').style.opacity =
		currentIndex === 0 ? 0.5 : 1;
	document.getElementById('next').style.opacity =
		currentIndex === reviews.length - 1 ? 0.5 : 1;

	document.getElementById('prev').style.pointerEvents =
		currentIndex === 0 ? 'none' : 'auto';
	document.getElementById('next').style.pointerEvents =
		currentIndex === reviews.length - 1 ? 'none' : 'auto';
}
document.getElementById('prev').addEventListener('click', () => {
	if (currentIndex > 0) {
		currentIndex -= 1;
		updateCarousel();
	}
});

document.getElementById('next').addEventListener('click', () => {
	if (currentIndex < reviews.length - 1) {
		currentIndex += 1;
		updateCarousel();
	}
});

updateCarousel();
