import Splide from '@splidejs/splide';

Splide.defaults = {
    i18n: {
        first: 'Aller au premier slide',
        last: 'Aller au dernier slide',
        next: 'Slide suivant',
        pageX: 'Aller à la page %s',
        pause: 'Mettre en pause le carousel',
        play: 'Démarrer le carousel',
        prev: 'Slide précedent',
        slideX: 'Aller au slide %s'
    }
};

(function () {
    var splides = document.getElementsByClassName('splide'),
        i = 0;
    for (i = 0; i < splides.length; i+=1) {
        var splide = new Splide(splides[i]).mount(),
            toggleButton = splide.root.querySelector('.splide__autoplay');

        if (toggleButton) {
            splide.on( 'autoplay:play', function () {
                toggleButton.classList.add('is-active');
            } );

            splide.on( 'autoplay:pause', function () {
                toggleButton.classList.remove('is-active');
            } );
        }
    }
}());
