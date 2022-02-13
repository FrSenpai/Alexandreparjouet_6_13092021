// eslint-disable-next-line no-unused-vars
class Contact {
    constructor() {
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
}