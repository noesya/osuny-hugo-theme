import Splide from '@splidejs/splide';

Splide.defaults = {
    i18n: {
        play: '{{ i18n "commons.carousel.play" }}',
        prev: 'Slide précedent',
        next: 'Slide suivant',
    },
};

var elms = document.getElementsByClassName( 'splide' );
for ( var i = 0; i < elms.length; i++ ) {
    new Splide( elms[ i ] ).mount();
}
