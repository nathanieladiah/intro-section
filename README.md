# Frontend Mentor - Intro section with dropdown navigation solution

This is a solution to the [Intro section with dropdown navigation challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/intro-section-with-dropdown-navigation-ryaPetHE5). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- View the relevant dropdown menus on desktop and mobile when interacting with the navigation links
- View the optimal layout for the content depending on their device's screen size
- See hover states for all interactive elements on the page

### Screenshot

![Screenshot](./screenshot.png)


### Links

- Solution URL: [Solution code](https://github.com/nathanieladiah/intro-section)
- Live Site URL: [Solution site](https://nathanieladiah.github.io/intro-section)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- SCSS
- Flexbox
- CSS Grid
- Mobile-first workflow

I first created the markup and then went through the styling for the mobile version, then added styling with media query mixins for the
desktop version.

I used SCSS for the styling and javascript to handle the dropdown menus and toggling the nav on the mobile site.


### What I learned

I wanted to practice an architecture for sass, so I split the styling into partials even though it may have been
a bit of overkill for this project.

The javascript for displaying and hiding the dropdowns wasn't difficult, just selecting and changing attributes to
change the display from none to either block or flexbox or grid.

```js
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
```

But animating the drop down menus so that they didn't just appear and disappear.

So i created keyframe animations to fade in and fade out

```scss
@keyframes fade-in {
	0% {
		opacity: 0;
		transform: scale(0);
	}

	100% {
		opacity: 1;
		transform: scale(1);
	}
}


@keyframes fade-out {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
```

This let them fade in with

```scss
&[data-visible='true'] {
  display: grid;
  animation: fade-in 700ms forwards,
}
```

To get them to fade out I added another attribute to act as an intermediate to allow it to fade out before the display gets switched to none.

I used JavaScript to apply it on click.

```js
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
```

Only after the animation ends on the closing attribute are the other conditions set to false to change the display back to none.

Here's how I selected it:

```scss
&[closing] {
  transform: translateX(0);
  pointer-events: none;
  inset: 0;
  animation: fade-out 500ms forwards, remove-space 700ms forwards;
}
```

This makes the dropdowns fade in and out, but the item below still drops suddenly in the mobile nav for the new dropdown to fit

```scss
@keyframes add-space {
	0% {
		max-height: 0;
		margin-bottom: 0;
	}

	100% {
		max-height: 9.8rem;
		margin-bottom: 2rem;
	}

}

@keyframes remove-space {
	0% {
		max-height: 9.8rem;
		margin-bottom: 2rem;
	}
	100% {
		max-height: 0;
		margin-bottom: 0;
	}
}
```

By animating the height and margin of the incoming dropdown, the elements below gradually slide down and up to accommodate it.

### Continued development


### Useful resources

- [CSS-Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) - 
This is a great resource for seeing all the CSS grid properties and options visually.

- [Animate from display none](https://www.youtube.com/watch?v=4prVdA7_6u0) - A YouTube video by Kevin Powell. He explains how he goes about animating a dialog modal from display none.



## Author

- Website - [Nathaniel Adiah](https://nathanieladiah.github.io)
- Frontend Mentor - [@nathanieladiah](https://www.frontendmentor.io/profile/nathanieladiah)
- Twitter - [@nathanieladiah](https://www.twitter.com/nathanieladiah)
