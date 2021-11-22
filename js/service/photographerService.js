
class PhotographerService {
    by = {
        attr: null,
        value: null
    }
    constructor() {

    }

    get() {
        return fetch('http://localhost:5500/assets/json/FishEyeData.json').then((res) => 
            res.json()
        ).then((p) => p.photographers)
    }

    getById(id) {
        return fetch('http://localhost:5500/assets/json/FishEyeData.json').then((res) => res.json()).then((res) => {
        let result = {
            photographer:res.photographers.filter((p) => p.id === id)[0],
            media:res.media.filter((m) => m.photographerId === id)
        }
        return result
        })
    }
}