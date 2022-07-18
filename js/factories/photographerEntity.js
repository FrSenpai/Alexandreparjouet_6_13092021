import { url } from "../../env/env.js";

// eslint-disable-next-line no-unused-vars
export class PhotographerEntity {
    entity = {
        id:null,
        city:null,
        country:null,
        portrait:null,
        price:null,
        tagline:null
    };
    medias = {
        id:null,
        photographerId:null,
        title:null,
        image:null,
        likes:null,
        date:null,
        price:null
    }
    constructor(photographerData) {
        this.entity = photographerData.photographer
        this.medias = photographerData.medias
        this.processBanner()
        const totalLikes = this.countLikes()
        
        this.processPhotographerInfos(totalLikes, this.entity.price)
    }

    // setAttr(entity) {
    //     this.entity = entity
    // }

    processBanner() {
        const ctnPhotographerData = document.getElementById('photographerData')
        const name = document.createElement('h1')
        name.setAttribute('class', 'titlePhotographer')
        name.textContent = this.entity.name
        const position = document.createElement("p")
        position.setAttribute("id", "position")
        position.textContent = this.entity.city + ", " + this.entity.country
        const tagline = document.createElement("p")
        tagline.textContent = this.entity.tagline
        const avatar = document.createElement('img')
        avatar.setAttribute("src", url+"assets/portraits/" + this.entity.portrait)
        avatar.setAttribute("alt", "Photographie de "+this.entity.name)
        ctnPhotographerData.appendChild(name)
        ctnPhotographerData.appendChild(position)
        ctnPhotographerData.appendChild(tagline)
        const ctnAvatar = document.getElementById('photographerAvatar')
        ctnAvatar.appendChild(avatar)
    }
    
    countLikes(){
        //count total of likes
        let totalLikes = 0
        this.medias.map((m) => totalLikes += m.likes)
        return totalLikes
    }

    processPhotographerInfos(totalLikes, price) {
        const ctn = document.createElement('section')
        ctn.setAttribute('class', 'ctnPhotographerInfos')
        const ctnTotalLikes = document.createElement('section')
        const totalLikesDOM = document.createElement('p')
        totalLikesDOM.setAttribute('id', 'totalLikesCount')
        totalLikesDOM.textContent = totalLikes
        const heartIcon = document.createElement('img')
        heartIcon.setAttribute('src', url + 'assets/black_hearth.png')
        ctnTotalLikes.appendChild(totalLikesDOM)
        ctnTotalLikes.appendChild(heartIcon)
        const pricePerDay = document.createElement('p')
        pricePerDay.textContent = price + '€ / jour'
        ctn.appendChild(ctnTotalLikes)
        ctn.appendChild(pricePerDay)
        document.getElementsByTagName("main").item(0).appendChild(ctn)
    }


}