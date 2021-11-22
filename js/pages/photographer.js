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
            console.log(r)
        })
    }


}
let photographerService = new PhotographerService()
let home = new Photographer()