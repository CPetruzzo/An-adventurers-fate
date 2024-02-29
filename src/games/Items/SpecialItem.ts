import { InventoryItem } from "../Inventory";

// Subclase para otros objetos especiales
export class SpecialItem extends InventoryItem {
    constructor(quantity: number = 1) {
        super('Special Item', 'Description of the special item', quantity);
    }

    // Puedes agregar métodos específicos para los objetos especiales aquí
}