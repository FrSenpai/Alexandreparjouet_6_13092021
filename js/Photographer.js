class Photographer {

    constructor(photographer) {
        console.log(photographer)
    }
    initPhotographersDOM(photographer) {
        //we create DOM elements
        let section = this.createCtnPhotographer()
        let avatar = this.createAvatar(photographer.portrait)
        let bio = this.createBio(photographer)
        section.appendChild(avatar)
        let ctnPhotographers = document.getElementsByClassName('ctnPhotographers')
        ctnPhotographers[0].appendChild(section)
    }

    createCtnPhotographer() {
        let section = document.createElement("section")
        section.setAttribute('class', 'ctnPhotographer')
        return section
    }

    createAvatar(portrait) {
        let avatar = document.createElement('img')
        avatar.setAttribute('src', "http://localhost:5500/assets/portraits/" + portrait)
        avatar.setAttribute("class", "avatar")
        return avatar
    }

}