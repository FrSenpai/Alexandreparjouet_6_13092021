
// eslint-disable-next-line no-unused-vars
class PhotographerService {
    by = {
        attr: null,
        value: null
    }
    constructor() {

    }

    get() {
        return fetch('https://frsenpai.github.io/Alexandreparjouet_6_13092021/assets/json/FishEyeData.json').then((res) => 
            res.json()
        ).then((p) => p.photographers)
    }

    getById(id) {
        return fetch('https://frsenpai.github.io/Alexandreparjouet_6_13092021/assets/json/FishEyeData.json').then((res) => res.json()).then((res) => {
        let result = {
            photographer:res.photographers.filter((p) => p.id === id)[0],
            medias:res.media.filter((m) => m.photographerId === id)
        }
        return result
        })
    }
}