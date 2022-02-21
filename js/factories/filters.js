import { Gallery } from "./gallery.js";

export class Filter {
    medias
    constructor(medias) {
        this.medias = medias
        this.processSelect()
        this.handleUpdateFilter()
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
                c.addEventListener("click", function () {
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
                c.addEventListener('keydown', function(key) {
                    //catch another key
                    if (key.key !== "Enter") return
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
                    
                })
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener("click", function (e) {
                /*when the select box is clicked, close any other select boxes,
                and open/close the current select box:*/
                //change icon when open/close select
                const selectInp = document.getElementsByClassName('select-selected')[0]
                if (selectInp.style.backgroundImage === 'url("https://frsenpai.github.io/Alexandreparjouet_6_13092021/assets/selectArrow_opened.png")') {
                    selectInp.style.backgroundImage = "url('https://frsenpai.github.io/Alexandreparjouet_6_13092021/assets/selectArrow.png')"
                    selectInp.style.borderBottomLeftRadius = "5px"
                    selectInp.style.borderBottomRightRadius = "5px"
                } else {
                    selectInp.style.backgroundImage = "url('https://frsenpai.github.io/Alexandreparjouet_6_13092021/assets/selectArrow_opened.png')"
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
            a.addEventListener('keydown', function(e) {
                if (e.key !== "Enter") return
 /*when the select box is clicked, close any other select boxes,
                and open/close the current select box:*/
                //change icon when open/close select
                const selectInp = document.getElementsByClassName('select-selected')[0]
                if (selectInp.style.backgroundImage === 'url("https://frsenpai.github.io/Alexandreparjouet_6_13092021/assets/selectArrow_opened.png")') {
                    selectInp.style.backgroundImage = "url('https://frsenpai.github.io/Alexandreparjouet_6_13092021/assets/selectArrow.png')"
                    selectInp.style.borderBottomLeftRadius = "5px"
                    selectInp.style.borderBottomRightRadius = "5px"
                } else {
                    selectInp.style.backgroundImage = "url('https://frsenpai.github.io/Alexandreparjouet_6_13092021/assets/selectArrow_opened.png')"
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
                
            })
            /*if the user clicks anywhere outside the select box,
then close all select boxes:*/
            document.addEventListener("click", this.closeAllSelect());
            document.addEventListener("keydown",(k) => {
                if (k.key !== "Escape") return
                this.closeAllSelect()
            })
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
            items[i].addEventListener("keydown", (e) => {
                if (e.key !== "Enter") return
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
}