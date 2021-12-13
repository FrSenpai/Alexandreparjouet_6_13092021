class Gallery {
    constructor(medias) {
        this.buildGallery(medias)
    }

    buildGallery(medias) {
        medias.map((m) => new ImageEntity(m))
    }
}
