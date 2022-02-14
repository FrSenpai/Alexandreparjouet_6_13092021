// eslint-disable-next-line no-unused-vars
class LightBox {
    targetId
    /**
     * 
     * @param {number} targetId index of media
     * @param {Array} medias photographer medias
     */
    constructor(targetId, medias) {
        this.targetId = targetId
        this.buildLightBox(medias)
        
    }
    /**
     * 
     * @param {Array} medias photographer medias
     * @param {Array} mediasDOM photographer medias DOM
     */
    generateLightBoxDOM(medias, mediasDOM) {
        document.getElementsByTagName("body")[0].style.overflow = "hidden"
        const ctnLightBox = document.getElementsByClassName('ctnLightbox')[0]
        const ctnImg = document.getElementsByClassName('ctnImg')[0]
        const isImg = medias[this.targetId]?.image ? true : false
        ctnLightBox.style.visibility = "visible"
        const img = this.buildImage(mediasDOM, isImg,medias[this.targetId].title)
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


    buildImage(medias, isImg, title) {
        document.getElementsByClassName('lightboxImg')[0]?.remove()
        const media = isImg ? document.createElement('img') :  document.createElement('video')
        if (!isImg) {
            media.setAttribute('autoplay', "true")
            media.setAttribute('controls', "true")
        }
        media.setAttribute('src', medias[this.targetId].getAttribute('src'))
        media.setAttribute('class', "lightboxImg")
        media.setAttribute('tabindex', '0')
        media.setAttribute('alt', title) 
        return media
    }

    handleClickArrow(medias, mediasDOM) {
        let arrows = document.getElementsByClassName('arrow')
        for (let i = 0; i < arrows.length; i++) {
            arrows[i].addEventListener('click', () => this.updateMedia(i===0 ? false : true, medias, mediasDOM))
        }
    }
    /**
     * 
     * @param {boolean} polarity its to determine the orientation of the index
     * @param {*} medias list of all medias
     * @param {*} mediasDOM list of medias DOM
     */
    updateMedia(polarity, medias, mediasDOM) {
        //conditional update of targetId
        const mediasLength = medias.length - 1
        if (polarity && this.targetId < mediasLength) this.targetId++
        else if (polarity && !(this.targetId < mediasLength)) this.targetId = 0
        if (!polarity && this.targetId === 0) this.targetId = mediasLength
        else if(!polarity && this.targetId !== 0)this.targetId--
        //update DOM
        const img = this.buildImage(mediasDOM, medias[this.targetId]?.image ? true : false, medias[this.targetId].title)
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
    /**
     * 
     * @param {Array} medias list of all medias
     * @param {Array} mediasDOM list of all medias DOM
     */
    handleKeyEvents(medias, mediasDOM) {
        document.getElementsByTagName('body')[0].addEventListener('keydown', (k) => {
            if (k.key === "Escape") this.close()
            if (k.key === "ArrowRight") this.updateMedia(true,medias, mediasDOM)
            if (k.key === "ArrowLeft") this.updateMedia(false,medias, mediasDOM)
        })
    }

    
}