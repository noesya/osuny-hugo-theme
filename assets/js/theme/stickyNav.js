// Ugly: need to clean by alexis :)

const events = ['scroll', 'touchmove'];
let previousY = 0,
    y = 0,
    classSticky = 'is-sticky',
    classScrollingDown = 'is-scrolling-down',
    classMenuOpen = 'is-menu-open',
    header = document.querySelector('header[role="banner"]'),
    offset = header.offsetHeight,
    menu = header.querySelector('.menu'),
    dropdowns = header.querySelectorAll('[data-bs-toggle="dropdown"]')
    dropdownsMenu = header.querySelectorAll('.dropdown-menu');


dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('hidden.bs.dropdown', function (e) {
        if (!header.querySelector('[aria-expanded="true"]')) {
            document.documentElement.classList.remove(classMenuOpen);
        };
    });
    dropdown.addEventListener('show.bs.dropdown', function () {
        document.documentElement.classList.add(classMenuOpen);
    });
});

menu.addEventListener('show.bs.collapse', function () {
    document.documentElement.classList.add(classMenuOpen);
});
menu.addEventListener('hide.bs.collapse', function () {
    document.documentElement.classList.remove(classMenuOpen);
});

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
            document.documentElement.classList.remove(classMenuOpen);

            for (var i = 0; i < dropdowns.length; i++) {
                dropdowns[i].classList.remove("show");
                dropdowns[i].setAttribute("aria-expanded", false);
            }
            for (var i = 0; i < dropdownsMenu.length; i++) {
                dropdownsMenu[i].classList.remove("show");
            }

        } else {
            document.documentElement.classList.remove(classScrollingDown);
        }

        previousY = y;
    });
});
