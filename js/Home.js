class Home {
    env
    constructor() {
        this.loadPhotographers()
        this.env = import('../env/env.js');
    }

    loadPhotographers() {
        fetch('http://localhost:5500/assets/json/FishEyeData.json').then((res) => res.json()).then((res) => {
            console.log(res)
            res.photographers.map((p) => {
                console.log(p)
                //we create a section for each photographers with many datas

            })
        })
    }

    initPhotographersDOM(photographer) {
        
        console.log(photographer)
        let section = document.createElement("section")
        let avatar = document.createElement('img').setAttribute('src', env.url+ "/assets/portraits/" + photographer.portrait)
        console.log(env)
    }
}