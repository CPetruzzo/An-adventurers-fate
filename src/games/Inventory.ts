// Clase base para los elementos del inventario
export class InventoryItem {
    name: string;
    description: string;
    quantity: number; // Propiedad para almacenar la cantidad de este elemento en el inventario

    constructor(name: string, description: string, quantity: number = 1) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
    }

    // Método para usar el objeto (puede ser implementado en las subclases)
    use(): void {
        // Implementación genérica para usar un objeto del inventario
    }
}

// Define una subclase para las armas que extiende la clase de elementos del inventario
export class Weapon extends InventoryItem {
    public damage: number;

    constructor(name: string, description: string, quantity: number, damage: number) {
        super(name, description, quantity);
        this.damage = damage;
    }
}

// Define una subclase para otros objetos especiales que extiende la clase de elementos del inventario
export class SpecialItem extends InventoryItem {
    constructor() {
        super('Special Item', 'Description of the special item');
    }

    // Agrega métodos específicos para los objetos especiales, si es necesario
}

// Clase para el inventario
export class Inventory {
    private static instance: Inventory;
    items: InventoryItem[];

    private constructor() {
        this.items = [];
    }

    // Método estático para obtener la instancia del inventario
    public static getInstance(): Inventory {
        if (!Inventory.instance) {
            Inventory.instance = new Inventory();
        }
        return Inventory.instance;
    }

    // Agregar un elemento al inventario
    public addItem(item: InventoryItem): void {
        this.items.push(item);
    }

    // Eliminar un elemento del inventario
    public removeItem(item: InventoryItem): void {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
}