class Aside {
    constructor () {
        this.element = document.querySelector('aside');

        console.log(this.element);
        // var firstScrollSpyEl = document.querySelector('[data-bs-spy="scroll"]')
        // firstScrollSpyEl.addEventListener('activate.bs.scrollspy', function (e) {
        //     console.log(e)
        // })
    }
}

export default new Aside();
