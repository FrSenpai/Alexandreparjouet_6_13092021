class ImageEntity {
    constructor(media) {
        this.buildSection(media) 
        console.log("dsq")
    }

    buildSection(media) {
        const ctnMedia = document.createElement('section')
        ctnMedia.setAttribute('class', 'imageItem')
        const image = document.createElement('img')
        image.setAttribute('src', "http://localhost:5500/assets/portraits/")
        console.log(media)
    }
}