import ScrollSpy from 'bootstrap/js/src/scrollspy';

window.addEventListener('load', () => {
    document.body.classList.add('is-loaded');
});

if (document.querySelector('#nav-toc')) {
    new ScrollSpy(document.body, {
        target: '#nav-toc',
        offset: 300
    });
}
