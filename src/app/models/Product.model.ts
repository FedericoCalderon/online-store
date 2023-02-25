let idGen = 0;

class _Image {
    name: string;
    url: string;

    constructor(name: string, url: string) {
        this.name = name || "",
        this.url = url || ""
    }
}

export class _Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: _Image;

    constructor (
        title: string,
        price: number,
        description: string,
        imageName: string, 
        imageUrl: string,
        id?: number,
    ) {
        this.id = this.generateId(id);
        this.title = title,
        this.price = price,
        this.description = description,
        this.image = new _Image(imageName, imageUrl)
    }

    generateId(id: number | undefined) {
    // generateId() {
        if (id == undefined || id == null) {
            idGen++;
            return idGen;
        }
        return id;
    }

}