// eslint-disable-next-line no-unused-vars
export class Contact {
    constructor() {
        this.handleVisibilityContactModal()
        this.handleClickBtn()
    }

    handleClickBtn() {
        document.getElementsByClassName('send')[0].addEventListener('click', () => {
            const inputs = document.getElementsByClassName('formInput')
            const formValues = []
            for (let i = 0; i < inputs.length; i++) {
                formValues.push({attr: inputs[i].name, value: inputs[i].value})
            }
            console.log(formValues)
        })
    }

    handleVisibilityContactModal() {
        document.getElementsByTagName('body')[0].addEventListener('keydown', (k) => {
            const contactModal = document.getElementsByClassName('ctnContact')[0]
            if (k.key === "Escape" && contactModal.style.visibility === "visible") this.updateVisibilityContactModal()

        })
        //I could assign the same class to loop and avoid "duplication code"
        document.getElementsByClassName('contactMe')[0].addEventListener('click', () => {
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
            const photographerName = document.getElementsByClassName('titlePhotographer')[0]
            
            title.innerText = "Contactez-moi" + "\n" + photographerName.textContent
            contactModal.style.visibility = "visible"
            body.style.overflow = "hidden"
            document.getElementById('firstname').focus()
        } else {
            contactModal.style.visibility = "hidden"
            body.style.overflow = "visible"
        }
    }
}