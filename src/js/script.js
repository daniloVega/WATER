import "../scss/style.scss";
// Hamburger menu logic 
document.getElementById('hamburger').addEventListener('click', function() {
	this.classList.toggle('open');
	document.getElementById('menu').classList.toggle('open');
});
// Dropdownlogic
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
	toggle.addEventListener('click', function(event) {
		event.preventDefault(); // Prevent the default action of the link
		const parentLi = this.parentElement;
		parentLi.classList.toggle('active'); // Toggle the 'active' class to show/hide the dropdown menu
	});
});
