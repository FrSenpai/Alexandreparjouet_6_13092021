
class Home {
    constructor() {
        this.loadPhotographers()
    }

    loadPhotographers() {
        photographerService.get().then((photographers)=> {
            photographers.map((p) => {
                //we create a section for each photographers with many datas
                this.initPhotographersDOM(p)
            })
        })
        
    }

    initPhotographersDOM(photographer) {
        //we create DOM elements
        let section = this.createCtnPhotographer()
        let avatar = this.createAvatar(photographer.portrait, photographer.name, photographer.id)
        let bio = this.createBio(photographer)
        section.appendChild(avatar)
        section.appendChild(bio)
        let ctnPhotographers = document.getElementsByClassName('ctnPhotographers')
        ctnPhotographers[0].appendChild(section)
    }

    createCtnPhotographer() {
        let section = document.createElement("section")
        section.setAttribute('class', 'ctnPhotographer')
        return section
    }

    createAvatar(portrait, name, id) {
        let ctnAvatar = document.createElement('section')
        ctnAvatar.setAttribute('class', 'ctnAvatar')
        let linkAvatar = document.createElement('a')
        let nameTitle = document.createElement('h2')
        nameTitle.textContent = name
        linkAvatar.href = 'https://frsenpai.github.io/Alexandreparjouet_6_13092021/pages/photographer.html?id=' + id
        let avatar = document.createElement('img')
        avatar.alt= name
        avatar.setAttribute('src', "https://frsenpai.github.io/Alexandreparjouet_6_13092021/assets/portraits/" + portrait)
        avatar.setAttribute("class", "avatar")
        linkAvatar.appendChild(avatar)
        linkAvatar.appendChild(nameTitle)
        ctnAvatar.appendChild(linkAvatar)
        return ctnAvatar
    }

    createBio(p) {
        let section = document.createElement("section")
        section.setAttribute('class', 'ctnBio')
        let position = document.createElement('p')
        position.textContent = p.city + ", " + p.country
        position.setAttribute('class', "position")
        let tagLine = document.createElement('p')
        tagLine.textContent = p.tagline
        tagLine.setAttribute('class', 'tagline')
        let price = document.createElement('p')
        price.textContent = p.price +"€/jour"
        price.setAttribute('class', "price")
        
        section.appendChild(position)
        section.appendChild(tagLine)
        section.appendChild(price)
        return section
    }


}
let photographerService = new PhotographerService()
let home = new Home()