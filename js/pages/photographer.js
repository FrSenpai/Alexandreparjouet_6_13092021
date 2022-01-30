class Photographer {
    photographer
    gallery
    medias
    contact
    constructor() {
        this.loadParams()
        this.processSelect()
        this.handleUpdateFilter()
        this.handleVisibilityContactModal()
    }

    loadParams() {
        const params = new URLSearchParams(window.location.search)
        //TODO handle error
        params.get('id') ? this.getPhotographer(Number(params.get('id'))) : null
    }

    getPhotographer(id) {
        photographerService.getById(id).then((r) => {
            if (r) {
                this.photographer = new PhotographerEntity(r)
                this.processBanner()
                //filtered by popularity by default
                this.gallery = new Gallery(r.medias, 0)
                this.medias = r.medias
                //count total of likes
                let totalLikes = 0
                r.medias.map((m) => totalLikes += m.likes)
                this.processPhotographerInfos(totalLikes, r.photographer.price)
            }
        })
    }

    processPhotographerInfos(totalLikes, price) {
        const ctn = document.createElement('section')
        ctn.setAttribute('class', 'ctnPhotographerInfos')
        const ctnTotalLikes = document.createElement('section')
        const totalLikesDOM = document.createElement('p')
        totalLikesDOM.setAttribute('id', 'totalLikesCount')
        totalLikesDOM.textContent = totalLikes
        const heartIcon = document.createElement('img')
        heartIcon.setAttribute('src', 'http://localhost:5500/assets/black_hearth.png')
        ctnTotalLikes.appendChild(totalLikesDOM)
        ctnTotalLikes.appendChild(heartIcon)
        const pricePerDay = document.createElement('p')
        pricePerDay.textContent = price + '€ / jour'
        ctn.appendChild(ctnTotalLikes)
        ctn.appendChild(pricePerDay)
        const main = document.getElementsByTagName("main").item(0).appendChild(ctn)
    }

    processBanner() {
        const ctnPhotographerData = document.getElementById('photographerData')
        const name = document.createElement('h1')
        name.textContent = this.photographer.entity.name
        const position = document.createElement("p")
        position.setAttribute("id", "position")
        position.textContent = this.photographer.entity.city + ", " + this.photographer.entity.country
        const tagline = document.createElement("p")
        tagline.textContent = this.photographer.entity.tagline
        const avatar = document.createElement('img')
        avatar.setAttribute("src", "http://localhost:5500/assets/portraits/" + this.photographer.entity.portrait)
        ctnPhotographerData.appendChild(name)
        ctnPhotographerData.appendChild(position)
        ctnPhotographerData.appendChild(tagline)
        const ctnAvatar = document.getElementById('photographerAvatar')
        ctnAvatar.appendChild(avatar)
    }

    processSelect() {
        let x, i, j, l, ll, selElmnt, a, b, c;
        /*look for any elements with the class "custom-select":*/
        x = document.getElementsByClassName("custom-select");
        l = x.length;
        let initDone = false
        for (i = 0; i < l; i++) {
            selElmnt = x[i].getElementsByTagName("select")[0];
            ll = selElmnt.length;
            /*for each element, create a new DIV that will act as the selected item:*/
            a = document.createElement("DIV");
            a.setAttribute("class", "select-selected");
            a.setAttribute('tabindex', "0")
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[i].appendChild(a);
            /*for each element, create a new DIV that will contain the option list:*/
            b = document.createElement("DIV");
            b.setAttribute("class", "select-items select-hide");
            for (j = 0; j < ll; j++) {
                /*for each option in the original select element,
                create a new DIV that will act as an option item:*/
                c = document.createElement("DIV");
                c.innerHTML = selElmnt.options[j].innerHTML;
                if (!initDone) {
                    c.setAttribute('class', 'same-as-selected hidden');
                    initDone = true
                }
                c.setAttribute('tabindex', "0")
                c.addEventListener("click", function (e) {
                    /*when an item is clicked, update the original select box,
                    and the selected item:*/
                    let y, i, k, s, h, sl, yl;
                    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    sl = s.length;
                    h = this.parentNode.previousSibling;

                    for (i = 0; i < sl; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i;
                            h.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName("same-as-selected");
                            yl = y.length;
                            for (k = 0; k < yl; k++) {
                                //we display again last selected value
                                y[k].style.display = "flex"
                                y[k].removeAttribute("class");

                            }
                            this.setAttribute("class", "same-as-selected");
                            //we hide picked value
                            this.style.display = "none"
                            break;
                        }
                    }
                    h.click();
                });
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener("click", function (e) {
                /*when the select box is clicked, close any other select boxes,
                and open/close the current select box:*/
                //change icon when open/close select
                const selectInp = document.getElementsByClassName('select-selected')[0]
                if (selectInp.style.backgroundImage === 'url("../../assets/selectArrow_opened.png")') {
                    selectInp.style.backgroundImage = "url('../../assets/selectArrow.png')"
                    selectInp.style.borderBottomLeftRadius = "5px"
                    selectInp.style.borderBottomRightRadius = "5px"
                } else {
                    selectInp.style.backgroundImage = "url('../../assets/selectArrow_opened.png')"
                    selectInp.style.borderBottomLeftRadius = "0px"
                    selectInp.style.borderBottomRightRadius = "0px"
                }

                e.stopPropagation();
                /*a function that will close all select boxes in the document,
        except the current select box:*/
                let x, y, i, xl, yl, arrNo = [];
                x = document.getElementsByClassName("select-items");
                y = document.getElementsByClassName("select-selected");
                xl = x.length;
                yl = y.length;
                for (i = 0; i < yl; i++) {
                    if (this == y[i]) {
                        arrNo.push(i)
                    } else {
                        y[i].classList.remove("select-arrow-active");
                    }
                }
                for (i = 0; i < xl; i++) {
                    if (arrNo.indexOf(i)) {
                        x[i].classList.add("select-hide");
                    }
                }

                this.nextSibling.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
            });
            /*if the user clicks anywhere outside the select box,
then close all select boxes:*/
            document.addEventListener("click", this.closeAllSelect());
        }
    }


    closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
        except the current select box:*/
        let x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }

    }

    handleUpdateFilter() {
        const items = document.getElementsByClassName("select-items")[0].getElementsByTagName('div')
        for (let i = 0; i < items.length; i++) {
            items[i].addEventListener("click", (e) => {
                this.updateFilter(e.target.innerHTML)
            })
        }

    }

    updateFilter(by) {
        const galleryItem = document.getElementsByClassName('ctnGalleryItem')
        while (galleryItem.length > 0) {
            galleryItem[0].remove()
        }

        switch (by) {
            case "Popularité":
                this.gallery = new Gallery(this.medias, 0)
                break
            case "Date":
                this.gallery = new Gallery(this.medias, 1)
                break
            case "Titre":
                this.gallery = new Gallery(this.medias, 2)
                break
        }
    }

    handleVisibilityContactModal() {
        document.getElementsByTagName('body')[0].addEventListener('keydown', (k) => {
            const contactModal = document.getElementsByClassName('ctnContact')[0]
            if (k.key === "Escape" && contactModal.style.visibility === "visible") this.updateVisibilityContactModal()
            
        })
        document.getElementsByClassName('contactMe')[0].addEventListener('click', () => {
            console.log("éhdsjqds")
            this.updateVisibilityContactModal()
        })
        document.getElementsByClassName('closeContactModal')[0].addEventListener('click', () => {
            this.updateVisibilityContactModal()
        })
    }

    updateVisibilityContactModal() {
        const contactModal = document.getElementsByClassName('ctnContact')[0]
        const body = document.getElementsByTagName('body')[0]
        //its an empty string on first click so we need to check if empty or not too
        if (contactModal.style.visibility === "hidden" || contactModal.style.visibility === "") {
            const title = document.getElementsByClassName("contactMeTitle")[0]
            this.contact = new Contact()
            title.innerText = "Contactez-moi" + "\n Mimi Keel"
            contactModal.style.visibility = "visible"
            body.style.overflow = "hidden"
        } else {
            contactModal.style.visibility = "hidden"
            body.style.overflow = "visible"
        }
    }
}
let photographerService = new PhotographerService()
let home = new Photographer()