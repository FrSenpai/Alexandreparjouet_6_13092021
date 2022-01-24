class LightBox {
    targetId
    /**
     * 
     * @param {number} targetId index of media
     * @param {Array} medias photographer medias
     */
    constructor(targetId, medias) {
        console.log(targetId)
        this.targetId = targetId
        this.buildLightBox(medias)
        
    }
    /**
     * 
     * @param {*} medias 
     * @param {*} mediasDOM 
     */
    generateLightBoxDOM(medias, mediasDOM) {
        document.getElementsByTagName("body")[0].style.overflow = "hidden"
        const ctnLightBox = document.getElementsByClassName('ctnLightbox')[0]
        const ctnImg = document.getElementsByClassName('ctnImg')[0]
        const isImg = medias[this.targetId]?.image ? true : false
        ctnLightBox.style.visibility = "visible"
        const img = this.buildImage(mediasDOM, isImg)
        const title = document.createElement('p')
        title.setAttribute('class', 'titleImg')
        title.textContent = medias[this.targetId].title
        ctnImg.appendChild(img)
        ctnImg.appendChild(title)
    }

    buildLightBox(medias) {
        const mediasDOM = Array.from(document.getElementsByClassName('galleryItem')) //DOM elements containing every medias
        this.generateLightBoxDOM(medias, mediasDOM)
        this.handleClickArrow(medias, mediasDOM )
        this.handleClose()
        this.handleKeyEvents(medias, mediasDOM)  
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
        for (let i = 0; i < arrows.length; i++) {
            arrows[i].addEventListener('click', () => this.updateMedia(i===0 ? false : true, medias, mediasDOM))
        }
    }

    updateMedia(polarity, medias, mediasDOM) {
        const ctn = document.getElementsByClassName('ctnImg')[0]
        //conditional update of targetId
        if (polarity && this.targetId < medias.length) this.targetId++
        else if (polarity && !(this.targetId < medias.length)) this.targetId = 0
        if (!polarity && this.targetId === 0) this.targetId = medias.length -1
        else this.targetId--
        const img = this.buildImage(mediasDOM, medias[this.targetId]?.image ? true : false)
        const ctnTitle = document.getElementsByClassName('titleImg')[0]
        document.getElementsByClassName('ctnImg')[0].insertBefore(img, ctnTitle)
        ctnTitle.textContent = medias[this.targetId].title
    }

    handleClose() {
        document.getElementsByClassName('close')[0].addEventListener('click', () => {
            this.close()
        })
        
    }

    close() {
        document.getElementsByClassName("ctnLightbox")[0].style.visibility = "hidden"
            document.getElementsByClassName('titleImg')[0]?.remove()
            document.getElementsByTagName("body")[0].style.overflow = "auto"
    }

    handleKeyEvents(medias, mediasDOM) {
        document.getElementsByTagName('body')[0].addEventListener('keydown', (k) => {
            if (k.key === "Escape") this.close()
            if (k.key === "ArrowRight") this.updateMedia(true,medias, mediasDOM)
            if (k.key === "ArrowLeft") this.updateMedia(false,medias, mediasDOM)
        })
    }

    
}