const events = ['scroll', 'touchmove'];
let previousY = 0,
    y = 0,
    classSticky = 'is-sticky',
    classScrollingDown = 'is-scrolling-down',
    classMenuOpen = 'is-menu-open',
    header = document.querySelector('header[role="banner"]'),
    offset = header.offsetHeight,
    scrollMarginTop = '--scroll-margin-top',
    menu = header.querySelector('.menu');

menu.addEventListener('show.bs.collapse', () => {
    document.documentElement.classList.add(classMenuOpen);
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
            // document.documentElement.style.setProperty(scrollMarginTop, '100px');
        } else {
            document.documentElement.classList.remove(classScrollingDown);
            // document.documentElement.style.setProperty(scrollMarginTop, '200px');
        }

        previousY = y;
    });
});
