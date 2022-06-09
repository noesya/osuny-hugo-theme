const events = ['scroll', 'touchmove'];
let previousY = 0,
    y = 0,
    i = 0,
    classSticky = 'is-sticky',
    classScrollingDown = 'is-scrolling-down',
    classMenuOpen = 'is-menu-open',
    header = document.querySelector('header[role="banner"]'),
    offset = header.offsetHeight,
    menu = header.querySelector('.menu'),
    isMenusOpened = false,
    dropdowns = header.querySelectorAll('[data-bs-toggle="dropdown"]'),
    dropdownsMenu = header.querySelectorAll('.dropdown-menu'),
    closeMenus;

// dropdowns.forEach((dropdown) => {
//     dropdown.addEventListener('hidden.bs.dropdown', () => {
//         if (!header.querySelector('[aria-expanded="true"]')) {
//             document.documentElement.classList.remove(classMenuOpen);
//         }
//     });
//     dropdown.addEventListener('show.bs.dropdown', () => {
//         document.documentElement.classList.add(classMenuOpen);
//         isMenusOpened = true;
//     });
// });

menu.addEventListener('show.bs.collapse', () => {
    document.documentElement.classList.add(classMenuOpen);
    isMenusOpened = true;
});

menu.addEventListener('hide.bs.collapse', () => {
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
            // closeMenus();
            // menu.collapse('hide');
            
        } else {
            document.documentElement.classList.remove(classScrollingDown);
        }

        previousY = y;
    });
});

closeMenus = function () {
    if (!isMenusOpened) {
        return;
    }

    document.documentElement.classList.remove(classMenuOpen);

    for (i = 0; i < dropdowns.length; i += 1) {
        dropdowns[i].classList.remove('show');
        dropdowns[i].setAttribute('aria-expanded', false);
    }

    for (i = 0; i < dropdownsMenu.length; i += 1) {
        dropdownsMenu[i].classList.remove('show');
    }

    isMenusOpened = false;
};
