import 'intersection-observer';
import '../utils/number';

// Compatibilities
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

const OPTIONS = {
    DURATION: 2000 // in ms
};

class KeyFigures {
    constructor (dom) {
        this.dom = dom;
        this.time = 0;
        this.init();
    }

    init () {
        this.figures = this.dom.querySelectorAll('strong');
        this.targets = [];
        this.values = [];
        this.figures.forEach((figure) => {
            this.values.push(0);
            this.targets.push(parseFloat(figure.innerHTML, 10));
            figure.style.minWidth = figure.offsetWidth + 'px';
        });
        this.intersectionObserver = new IntersectionObserver(this.play.bind(this));
        this.intersectionObserver.POLL_INTERVAL = 100;
        this.intersectionObserver.observe(this.dom);
    }

    play () {
        this.intersectionObserver.unobserve(this.dom);
        this.start = new Date().getTime();
        this.loop();
    }

    loop () {
        this.time = Math.min(new Date().getTime() - this.start, OPTIONS.DURATION);
        this.figures.forEach((figure, index) => {
            this.values[index] = this.getValues(this.time, 0, this.targets[index], OPTIONS.DURATION);
            figure.innerHTML = this.values[index];
        });

        if (this.time < OPTIONS.DURATION) {
            window.requestAnimationFrame(this.loop.bind(this));
        }
    }

    getValues (time, from, to, duration) {
        const decimalsLength = to.decimals();
        let value = KeyFigures.easeOutQuad(time, from, to, duration);
        if (decimalsLength) {
            value = Math.round(value * decimalsLength * 10) / (decimalsLength * 10);
        } else {
            value = Math.round(value);
        }
        return value.toFixed(decimalsLength);
    }

    static easeInOutQuart (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        } else {
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    }

    static easeOutQuad (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    }
}

window.addEventListener('load', () => {
    const keyFigures = document.querySelectorAll('.block-key_figures');
    keyFigures.forEach((dom) => {
        new KeyFigures(dom);
    });
});


