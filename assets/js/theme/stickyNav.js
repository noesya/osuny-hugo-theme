const events = ['scroll', 'touchmove'];
let previousY = 0,
    y = 0,
    classSticky = 'is-sticky',
    classScrollingDown = 'is-scrolling-down',
    header = document.querySelector('header[role="banner"]');

events.forEach((event) => {
    window.addEventListener(event, () => {
        y = window.scrollY;

        if (y > header.offsetHeight) {
            header.classList.add(classSticky);
        } else {
            header.classList.remove(classSticky);
        }

        if (y > previousY) {
            document.documentElement.classList.add(classScrollingDown);
        } else {
            document.documentElement.classList.remove(classScrollingDown);
        }

        previousY = y;
    });
});
