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

document.addEventListener('DOMContentLoaded', () => {
	const items = document.querySelectorAll('.benefits__item');
	const benefitsContents = document.querySelectorAll(
		'.benefits__content-container .benefits__content-secondary'
	);

	const deactivateArrows = () => {
		items.forEach((item) => {
			const arrow = item.querySelector('.benefits__icon-tablet');
			arrow?.classList.remove('benefits__icon-tablet-active');
		});
	};

	const activateArrow = (item) => {
		const arrow = item.querySelector('.benefits__icon-tablet');
		arrow?.classList.add('benefits__icon-tablet-active');
	};

	const updateItemState = (itemToExpand) => {
		items.forEach((item) => {
			if (item === itemToExpand) {
				item.classList.add('benefits__item--expanded');
				item.classList.remove('benefits__item--collapsed');
			} else {
				item.classList.add('benefits__item--collapsed');
				item.classList.remove('benefits__item--expanded');
			}
		});
	};

	const handleItemClick = (item) => {
		return () => {
			const isExpanded = item.classList.contains(
				'benefits__item--expanded'
			);
			updateItemState(isExpanded ? null : item);
		};
	};

	const handleMouseOver = (item) => {
		return () => {
			deactivateArrows();
			activateArrow(item);

			const targetId = item.getAttribute('id');
			const targetContent = document.querySelector(
				`.benefits__content-container .benefits__content-secondary#${targetId}`
			);

			benefitsContents.forEach((content) => {
				content.classList.toggle(
					'benefits__content-secondary--active',
					content === targetContent
				);
			});

			if (!targetContent) {
				console.error(`No content found with ID: ${targetId}`);
			}
		};
	};

	if (items.length > 0) {
		updateItemState(items[0]);
		activateArrow(items[0]);
	}

	items.forEach((item) => {
		item.querySelector('.benefits__header').addEventListener(
			'click',
			handleItemClick(item)
		);
		item.addEventListener('mouseover', handleMouseOver(item));
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
	},
];
let currentIndex = 0;

const updateCarousel = () => {
	const review = reviews[currentIndex];

	document.querySelector('.carousel__description-text').textContent =
		review.review;
	document.querySelector('.carousel__people-name').textContent = review.name;
	document.querySelector('.carousel__people-img').src = review.image;

	const isAtStart = currentIndex === 0;
	const isAtEnd = currentIndex === reviews.length - 1;

	setButtonState('prev', !isAtStart);
	setButtonState('next', !isAtEnd);
};

const setButtonState = (buttonId, isEnabled) => {
	const button = document.getElementById(buttonId);
	button.style.opacity = isEnabled ? 1 : 0.5;
	button.style.pointerEvents = isEnabled ? 'auto' : 'none';
};

const handleNavigation = (direction) => {
	if (direction === 'prev' && currentIndex > 0) {
		currentIndex -= 1;
	} else if (direction === 'next' && currentIndex < reviews.length - 1) {
		currentIndex += 1;
	}
	updateCarousel();
};

document
	.getElementById('prev')
	.addEventListener('click', () => handleNavigation('prev'));
document
	.getElementById('next')
	.addEventListener('click', () => handleNavigation('next'));

updateCarousel();
