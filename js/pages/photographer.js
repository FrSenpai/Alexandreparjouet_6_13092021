class Photographer {
    constructor() {
        this.loadData()
    }

    loadData() {
        const params = new URLSearchParams(window.location.search)
        console.log(params.get('id'))
        //TODO handle error
        params.get('id') ? this.getPhotographer(Number(params.get('id'))) :null
    }

    getPhotographer(id) {
        photographerService.getById(id).then((r) => {
            if (r) {
                this.processBanner(r.photographer)
            }
        })
    }

    processBanner(p) {
        const ctnPhotographerData = document.getElementById('photographerData')
        let name = document.createElement('h1')
        name.textContent = p.name
        ctnPhotographerData.appendChild(name)
    }

}
let photographerService = new PhotographerService()
let home = new Photographer()