const timelines = document.querySelectorAll('.block-timeline--horizontal');

class BlockTimeline {
    constructor (block) {
        this.block = block;
        this.content = this.block.querySelector('.timeline');
        this.list = this.block.querySelector('.events ol');
        this.items = this.list.querySelectorAll('.event');
        this.previous = this.block.querySelector('.previous');
        this.next = this.block.querySelector('.next');

        this.index = 0;

        this.listen();
        this.resize();
        this.goTo(0);
    }

    listen () {
        window.addEventListener('resize', this.resize.bind(this));
        this.items.forEach((item, i) => {
            item.addEventListener('click', this.goTo.bind(this, i));
        });

        if (this.previous && this.next) {
            this.previous.addEventListener('click', () => {
                this.goTo(this.index-1);
            });
            this.next.addEventListener('click', () => {
                this.goTo(this.index+1);
            });
        }

        this.handlePointers();
    }

    goTo (_index) {
        this.index = Math.min(Math.max(_index, 0), this.items.length-1);
        this.update();
    }

    update () {
        this.list.style.marginLeft = `${-this.index * this.itemWidth}px`;

        this.items.forEach((item, index) => {
            if (index < this.index) {
                item.classList.add('is-passed');
            } else {
                item.classList.remove('is-passed');
            }
        });

        if (this.previous && this.next) {
            this.previous.disabled = this.index === 0;
            this.next.disabled = this.index === this.items.length - 1;
        }
    }

    resize () {
        let maxTitleHeight = 0;

        this.block.style = '';

        this.itemWidth = this.items[0].offsetWidth;

        this.items.forEach((item) => {
            maxTitleHeight = Math.max(item.querySelector('.title').offsetHeight, maxTitleHeight);
        });

        this.block.style.setProperty('--min-title-height', maxTitleHeight + 'px');
        this.update();
    }

    handlePointers () {
        let endEvents = ['pointerup', 'pointercancel'],
            startX,
            endX,
            threshold = 30;

        this.content.style.touchAction = "none";

        this.content.addEventListener('pointerdown', (event) => {
            startX = event.clientX;
            this.content.classList.add('is-grabbing');
        });

        this.content.addEventListener('pointermove', (event) => {
            endX = event.clientX;
        });

        endEvents.forEach(event => {
            this.content.addEventListener(event, () => {
                if (startX > endX + threshold) {
                    this.goTo(this.index+1);
                } else if (startX < endX - threshold) {
                    this.goTo(this.index-1);
                }

                this.content.classList.remove('is-grabbing');
            });
        });
    }
}

timelines.forEach((timeline) => {
    new BlockTimeline(timeline);
});
