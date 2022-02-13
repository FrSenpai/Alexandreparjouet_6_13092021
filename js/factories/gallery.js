// eslint-disable-next-line no-unused-vars
class Gallery {
    constructor(medias, filter) {
        this.buildGallery(medias, filter)
    }

    buildGallery(medias, filter) {
        switch (filter) {
            case 0:
                medias.sort(this.dynamicSort("-likes"));
                break
            case 1:
                medias.sort(this.dynamicSort("date"))
                break
            case 2:
                medias.sort(this.dynamicSort("title"))
                break
        }
        /*global ImageEntity*/
        // eslint-disable-next-line no-undef
        medias.map((m) => new ImageEntity(m, medias))
    }

    dynamicSort(property) {
        let sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
}