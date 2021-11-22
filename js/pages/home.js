
class Home {
    constructor() {
        this.loadPhotographers()
    }

    loadPhotographers() {
        photographerService.get().then((photographers)=> {
            console.log(photographers)
            photographers.map((p) => {
                //we create a section for each photographers with many datas
                new PhotographerEntity(p)
            })
        })
        
    }


}
let photographerService = new PhotographerService()
let home = new Home()