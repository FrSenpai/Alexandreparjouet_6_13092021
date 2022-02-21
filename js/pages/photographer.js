import { url } from "../../env/env.js"
import { Contact } from "../factories/contact.js"
import { Filter } from "../factories/filters.js"
import { Gallery } from "../factories/gallery.js"
import { PhotographerEntity } from "../factories/photographerEntity.js"
import { PhotographerService } from "../service/photographerService.js"

class Photographer {
    photographer
    gallery
    contact
    filter
    constructor() {
        this.loadParams()
        // this.processSelect()
        // this.handleUpdateFilter()
        this.contact = new Contact()
        
    }

    loadParams() {
        const params = new URLSearchParams(window.location.search)
        params.get('id') ? this.getPhotographer(Number(params.get('id'))) : window.location.replace(url)
    }

    getPhotographer(id) {
        photographerService.getById(id).then((r) => {
            if (!r.err) {
                this.photographer = new PhotographerEntity(r)
                //filtered by popularity by default
                this.gallery = new Gallery(r.medias, 0)
                this.filter = new Filter(r.medias)
            } else {
             window.location.replace(url)   
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    


}

let photographerService = new PhotographerService()
new Photographer()