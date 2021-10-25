class Home {
    tags= [];
    constructor() {
        this.loadPhotographers()
    }

    loadTags(tags){
        tags.map((t) => !this.tags.includes(t) ? this.tags.push(t) : null)
    }

    createDOMTags() {
        const list = document.getElementsByClassName("tagList")
        this.tags.map((t) => {
            let li = document.createElement("li")
            li.textContent = t
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
        console.log(photographer)
        let section = this.createCtnPhotographer()
        let avatar = this.createAvatar(photographer.portrait)
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