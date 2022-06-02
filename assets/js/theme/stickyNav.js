const events = ['scroll', 'touchmove'];
let previousY = 0,
    y = 0,
    classSticky = 'is-sticky',
    classScrollingDown = 'is-scrolling-down',
    header = document.querySelector('header[role="banner"]'),
    offset = header.offsetHeight,
    toggleMenu = header.querySelectorAll('[data-bs-toggle="dropdown"]'),
    dropdownMenu = header.querySelectorAll('.dropdown-menu');

events.forEach((event) => {
    window.addEventListener(event, () => {
        y = window.scrollY;

        if (y > offset) {
            header.classList.add(classSticky);
        } else {
            header.classList.remove(classSticky);
        }

        if (y > previousY) {
            document.documentElement.classList.add(classScrollingDown);

            // Ugly: need to clean by alexis :)
            for (var i = 0; i < toggleMenu.length; i++) {
                toggleMenu[i].classList.remove("show");
                toggleMenu[i].setAttribute("aria-expanded", false);
            }
            for (var i = 0; i < dropdownMenu.length; i++) {
                dropdownMenu[i].classList.remove("show");
            }

        } else {
            document.documentElement.classList.remove(classScrollingDown);
        }

        previousY = y;
    });
});
