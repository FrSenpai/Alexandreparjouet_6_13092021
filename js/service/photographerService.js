import { url } from "../../env/env.js"

// eslint-disable-next-line no-unused-vars
export class PhotographerService {
    by = {
        attr: null,
        value: null
    }
    constructor() {

    }

    get() {
        return fetch(url+'assets/json/FishEyeData.json').then((res) => 
            res.json()
        ).then((p) => p.photographers)
    }

    getById(id) {
        return fetch(url+'assets/json/FishEyeData.json').then((res) => res.json()).then((res) => {
        let result = {
            photographer:res.photographers.filter((p) => p.id === id)[0],
            medias:res.media.filter((m) => m.photographerId === id)
        }
        console.log(result)
        if (result.photographer === undefined) {
            return {err:"No photographer found"}
        }
        return result
        })
    }
}