class ImageEntity {
    constructor(media, mediasList) {
        this.buildSection(media,mediasList) 
        console.log("dsq")
    }

    buildSection(media,mediasList) {
        //generate DOM
        const ctnMedia = document.createElement('section')
        ctnMedia.setAttribute('class', 'ctnGalleryItem')
        let mediaDom
        media?.image ? mediaDom = document.createElement('img') : mediaDom = document.createElement('video')
        mediaDom.setAttribute('class', 'galleryItem')
        media?.video ? mediaDom.setAttribute('disablePictureInPicture', "true") : null
        mediaDom.setAttribute('src', `http://localhost:5500/assets/gallery/${media.photographerId}/` + this.getType(media))
        mediaDom.addEventListener('click', (e) => {
            let medias = Array.from(document.getElementsByClassName('galleryItem'))
            const targetId = medias.indexOf(e.target)
            const lightBox = new LightBox(targetId, mediasList)
        })
        const ctnInfos = document.createElement('section')
        ctnInfos.setAttribute('class',"infos")
        const title = document.createElement('p')
        const ctnLikes = document.createElement('section')
        ctnLikes.setAttribute('class', 'ctnLikes')
        const likes = document.createElement('p')
        likes.textContent = media.likes
        const likesIcon = document.createElement('img')
        likesIcon.setAttribute('src', "http://localhost:5500/assets/hearth.png" )
        likesIcon.addEventListener('click', () => {
            this.updateLikes(media, likes)
            })
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

    getType(media) {
        return media?.image ? media.image : media.video
    }
    updateLikes(media, likesDOM) {
        media.likes++
        likesDOM.textContent = media.likes
        document.getElementById('totalLikesCount').textContent = Number(document.getElementById('totalLikesCount').textContent) +1
    }
}                                          