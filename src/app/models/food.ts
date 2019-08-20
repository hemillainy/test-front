export class Food {
    public id: string;
    public title: string;
    public price: number;
    public cuisine: string;
    public quantity: number;

    constructor(
        id: string, title: string, price: number, cuisine: string
    ) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.cuisine = cuisine;
    }
}
