const events = ['scroll', 'touchmove'];
let previousY = 0,
    y = 0,
    header = document.querySelector('header[role="banner"]');

events.forEach((event) => {
    window.addEventListener(event, () => {
        y = window.scrollY;

        if (y > header.offsetHeight) {
            header.classList.add('is-sticky');
        } else {
            header.classList.remove('is-sticky');
        }

        if (y > previousY) {
            document.documentElement.classList.add('is-scrolling-down');
        } else {
            document.documentElement.classList.remove('is-scrolling-down');
        }

        previousY = y;
    });
});
