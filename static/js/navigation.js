const nav = document.getElementById('mobile-nav');
const navToggle = document.getElementById('nav-toggle');
const header = document.getElementById('main-header');
const body = document.querySelector('body');

navToggle.onclick = () => {
	const visibility = nav.dataset.visible

	if (visibility === "false") {
		nav.dataset.visible = 'true';
		navToggle.setAttribute('aria-expanded', true);
		header.dataset.overlay = 'true';
		body.classList.add('noscroll');

	} else {
		header.dataset.overlay = 'false';
		nav.dataset.visible = 'false';
		navToggle.setAttribute('aria-expanded', false);
		body.classList.remove('noscroll');
	}
}

// handle nav dropdowns

const dropToggles = document.querySelectorAll('.nav-dropdown-toggle');

dropToggles.forEach(toggle => {
	toggle.onclick = () => {
		const dropdownId = toggle.getAttribute('aria-controls');
		const dropdown = document.getElementById(dropdownId);

		const visibility = dropdown.dataset.visible;

		if (visibility === "false") {
			dropdown.dataset.visible = 'true';
			toggle.setAttribute('aria-expanded', true);

		} else {
			dropdown.setAttribute('closing', '');

			dropdown.addEventListener('animationend', () => {
				dropdown.removeAttribute('closing');
				dropdown.dataset.visible = 'false';
				toggle.setAttribute('aria-expanded', false);
			}, {once: true});
		}

	}
})