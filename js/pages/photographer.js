class Photographer {
    photographer
    constructor() {
        this.loadParams()
    }

    loadParams() {
        const params = new URLSearchParams(window.location.search)
        //TODO handle error
        params.get('id') ? this.getPhotographer(Number(params.get('id'))) :null
    }

    getPhotographer(id) {
        photographerService.getById(id).then((r) => {
            if (r) {
                this.photographer = new PhotographerEntity(r)
                this.processBanner()
            }
        })
    }

    processBanner() {
        const ctnPhotographerData = document.getElementById('photographerData')
        const name = document.createElement('h1')
        name.textContent = this.photographer.entity.name
        const position = document.createElement("p")
        position.setAttribute("id", "position")
        position.textContent = this.photographer.entity.city + ", " + this.photographer.entity.country
        const tagline = document.createElement("p")
        tagline.textContent = this.photographer.entity.tagline
        const avatar = document.createElement('img')
        avatar.setAttribute("src", "http://localhost:5500/assets/portraits/" + this.photographer.entity.portrait)
        ctnPhotographerData.appendChild(name)
        ctnPhotographerData.appendChild(position)
        ctnPhotographerData.appendChild(tagline)
        const ctnAvatar = document.getElementById('photographerAvatar')
        ctnAvatar.appendChild(avatar)
    }

}
let photographerService = new PhotographerService()
let home = new Photographer()