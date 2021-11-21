class Home {
    tags= [];
    constructor() {
        this.loadPhotographers()
        this.handleBottomScroll()
    }

    loadTags(tags){
        tags.map((t) => !this.tags.includes(t) ? this.tags.push(t) : null)
    }

    handleBottomScroll() {
        document.addEventListener('scroll', () => {
            const displayBtn = document.getElementsByClassName("goToMain")[0]
            console.log(window.scrollY)
            window.scrollY === 0 ? displayBtn.style.visibility = "hidden" : displayBtn.style.visibility = "visible"
        })
    }

    createDOMTags() {
        const list = document.getElementsByClassName("tagList")
        this.tags.map((t) => {
            let li = document.createElement("li")
            li.textContent = "#" + t
            list[0].appendChild(li)
        })
    }

    loadPhotographers() {
        fetch('http://localhost:5500/assets/json/FishEyeData.json').then((res) => res.json()).then((res) => {
            console.log(res)
            res.photographers.map((p) => {
                console.log(p)
                //we create a section for each photographers with many datas
                this.loadTags(p.tags)
                this.initPhotographersDOM(p)
            })
            this.createDOMTags()
        })
    }

    initPhotographersDOM(photographer) {
        //we create DOM elements
        let section = this.createCtnPhotographer()
        let avatar = this.createAvatar(photographer.portrait)
        let bio = this.createBio(photographer)
        section.appendChild(avatar)
        section.appendChild(bio)
        let ctnPhotographers = document.getElementsByClassName('ctnPhotographers')
        ctnPhotographers[0].appendChild(section)
    }

    createBio(p) {
        console.log(p)
        let section = document.createElement("section")
        section.setAttribute('class', 'ctnBio')
        let name = document.createElement('h3')
        name.textContent = p.name
        let position = document.createElement('p')
        position.textContent = p.city + ", " + p.country
        position.setAttribute('class', "position")
        let tagLine = document.createElement('p')
        tagLine.textContent = p.tagline
        tagLine.setAttribute('class', 'tagline')
        let price = document.createElement('p')
        price.textContent = p.price +"€/jour"
        price.setAttribute('class', "price")
        let ctnTags = document.createElement('ul')
        ctnTags.setAttribute('class', 'ctnTags')
        if (p.tags.length > 0) {
           p.tags.map((t) => {
               let tag = document.createElement("li")
               tag.textContent = "#"+t
               ctnTags.appendChild(tag)
           }) 
        }
        section.appendChild(name)
        section.appendChild(position)
        section.appendChild(tagLine)
        section.appendChild(price)
        section.appendChild(ctnTags)

        return section
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