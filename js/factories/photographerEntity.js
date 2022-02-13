// eslint-disable-next-line no-unused-vars
class PhotographerEntity {
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
        console.log(this.entity)
    }

    setAttr(entity) {
        this.entity = entity
    }



}