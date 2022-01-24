class LightBox {
    active
    targetId
    constructor(targetId, medias) {
        this.targetId = targetId
        this.buildLightBox(medias)
        
    }

    buildLightBox(medias) {
        document.getElementsByTagName("body")[0].style.overflow = "hidden"
        const ctnLightBox = document.getElementsByClassName('ctnLightbox')[0]
        const ctnImg = document.getElementsByClassName('ctnImg')[0]
        const allMedias = Array.from(document.getElementsByClassName('galleryItem'))
        const isImg = medias[this.targetId]?.image ? true : false
        ctnLightBox.style.visibility = "visible"
        const img = this.buildImage(allMedias, isImg)
        const title = document.createElement('p')
        title.setAttribute('class', 'titleImg')
        title.textContent = medias[this.targetId].title
        ctnImg.appendChild(img)
        ctnImg.appendChild(title)
        this.handleClickArrow(medias, allMedias )
        this.handleClose()
    }


    buildImage(medias, isImg) {
        document.getElementsByClassName('lightboxImg')[0]?.remove()
        const media = isImg ? document.createElement('img') :  document.createElement('video')
        if (!isImg) {
            media.setAttribute('autoplay', "true")
            media.setAttribute('controls', "true")
        }
        media.setAttribute('src', medias[this.targetId].getAttribute('src'))
        media.setAttribute('class', "lightboxImg")
        media.setAttribute('tabindex', '0')
        media.setAttribute('alt', "") //TODO
        return media
    }

    handleClickArrow(medias, mediasDOM) {
        let arrows = document.getElementsByClassName('arrow')
        console.log(arrows)
        for (let i = 0; i < arrows.length; i++) {
            arrows[i].addEventListener('click', () => this.updateMedia(i===0 ? false : true, medias, mediasDOM))
        }
    }

    updateMedia(polarity, medias, mediasDOM) {
        const ctn = document.getElementsByClassName('ctnImg')[0]
        polarity ? this.targetId++ : this.targetId--
        const img = this.buildImage(mediasDOM, medias[this.targetId]?.image ? true : false)

        const ctnTitle = document.getElementsByClassName('titleImg')[0]
        document.getElementsByClassName('ctnImg')[0].insertBefore(img, ctnTitle)
        ctnTitle.textContent = medias[this.targetId].title
    }

    handleClose() {
        document.getElementsByClassName('close')[0].addEventListener('click', () => {
            console.log("click")
            document.getElementsByClassName("ctnLightbox")[0].style.visibility = "hidden"
            document.getElementsByClassName('titleImg')[0].remove()
            document.getElementsByTagName("body")[0].style.overflow = "auto"
        })
    }

    
}