class Product {
    name: string;
    price: number

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price
    }

    public getName(): string {
        return this.name
    }

    public setName(name: string): void {
        this.name = name 
    }

    public getPrice(): number {
        return this.price
    }

    public setPrice(price: number): void {
        this.price = price
    }

    public log(): void {
        console.log(`Product: ${this.name}; Price: ${this.price}`)
    }
}

abstract class OrderItem {
    protected product: Product;
    protected quantity: number

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity= quantity
    }

    public getProduct(): Product {
        return this.product
    }

    public setProduct(product: Product): void {
        this.product = product 
    }

    public getQuantity(): number {
        return this.quantity
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity
    }

    public log(): void {
        this.product.log();
        console.log(`Quantity: ${this.quantity}`)
    }

    public abstract getCost(): number;

    public compare(other: OrderItem): number {
        const cost1 = this.getCost();
        const cost2 = other.getCost()

        if (cost1 < cost2) {
            return 1
        }
        else if (cost1 > cost2) {
            return -1
        }
        else {
            return 0
        }
    }
}

class DiscountOrderItem extends OrderItem {
    discount: number;

    constructor(product: Product, quantity: number, discount: number) {
        super(product, quantity);
        this.discount = discount;
    }

    public getDiscount(): number {
        return this.discount
    }

    public setDiscount(discount: number): void {
        this.discount = discount
    }

    public getCost(): number {
        return this.product.price * this.quantity * (1 - this.discount / 100);
    }
}

class QuantityDiscountOrderItem extends DiscountOrderItem {
    private _requiredQuantity: number;
  
    constructor(product: Product, quantity: number, discount: number, requiredQuantity: number) {
        super(product, quantity, discount);
        this._requiredQuantity = requiredQuantity;
    }
  
    get requiredQuantity(): number {
        return this._requiredQuantity;
    }
  
    set requiredQuantity(requiredQuantity: number) {
        this._requiredQuantity = requiredQuantity;
    }
  
    getCost(): number {
        if (this.quantity >= this.requiredQuantity) {
            return super.getCost();
        }
        else {
            return this.product.price * this.quantity;
        }
    }
}

class TransportOrderItem extends OrderItem {
    private _transportCost: number;
  
    constructor(product: Product, quantity: number, transportCost: number) {
        super(product, quantity);
        this._transportCost = transportCost;
    }
  
    get transportCost(): number {
        return this._transportCost;
    }
  
    set transportCost(transportCost: number) {
        this._transportCost = transportCost;
    }
  
    getCost(): number {
        return this.product.price * this.quantity + this.transportCost * this.quantity;
    }
  }

let product1 = new Product("Product 1", 10);
let product2 = new Product("Product 2", 20);
let product3 = new Product("Product 3", 30);

let order1 = new DiscountOrderItem(product1, 2, 10);
let order2 = new QuantityDiscountOrderItem(product2, 3, 10, 2);
let order3 = new TransportOrderItem(product3, 4, 5);
let order4 = new DiscountOrderItem(product1, 1, 15);
let order5 = new QuantityDiscountOrderItem(product2, 2, 15, 3);
let order6 = new TransportOrderItem(product3, 3, 5);

let orders: OrderItem[] = [order1, order2, order3, order4, order5, order6];

console.log("Original orders:");
for (let order of orders) {
    order.log();
}

orders.sort((a, b) => a.compare(b));

console.log("Sorted orders:");
for (let order of orders) {
    order.log();
}
