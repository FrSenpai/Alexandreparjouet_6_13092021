class ImageEntity {
    constructor(media) {
        this.buildSection(media) 
        console.log("dsq")
    }

    buildSection(media) {
        //generate DOM
        const ctnMedia = document.createElement('section')
        ctnMedia.setAttribute('class', 'ctnGalleryItem')
        let mediaDom
        media?.title ? mediaDom = document.createElement('img') : mediaDom = document.createElement('iframe')
        //voir avec Joffrey quoi afficher quand vidéo pour la "miniature"
        mediaDom.setAttribute('class', 'galleryItem')
        mediaDom.setAttribute('src', `http://localhost:5500/assets/gallery/${media.photographerId}/` + this.getType(media))
        
        const ctnInfos = document.createElement('section')
        ctnInfos.setAttribute('class',"infos")
        const title = document.createElement('p')
        const ctnLikes = document.createElement('section')
        ctnLikes.setAttribute('class', 'ctnLikes')
        const likes = document.createElement('p')
        likes.textContent = media.likes
        const likesIcon = document.createElement('img')
        likesIcon.setAttribute('src', "http://localhost:5500/assets/hearth.png" )
        media?.title ? title.textContent = media.title : title.textContent = "VIDEO TODO"
        title.textContent = media.title
        //insert generated DOM

        ctnLikes.appendChild(likes)
        ctnLikes.appendChild(likesIcon)
        ctnInfos.appendChild(title)
        ctnInfos.appendChild(ctnLikes)
        ctnMedia.appendChild(mediaDom)
        ctnMedia.appendChild(ctnInfos)
        document.getElementsByClassName("ctnGallery")[0].appendChild(ctnMedia)
    }
    //QUAND CLICK --> incrémentation, oui mais +1 et -1 ou +1 infini?
    getType(media) {
        console.log(media)
        return media?.title ? media.image : media.video
    }
}                                          