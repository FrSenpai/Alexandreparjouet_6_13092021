class Home {
    constructor() {
        this.loadPhotographers()
        this.handleBottomScroll()
    }

    loadPhotographers() {
        fetch('http://localhost:5500/assets/json/FishEyeData.json').then((res) => res.json()).then((res) => {
            console.log(res)
            res.photographers.map((p) => {
                console.log(p)
                //we create a section for each photographers with many datas
                new Photographer(p)
            })
        })
    }

}