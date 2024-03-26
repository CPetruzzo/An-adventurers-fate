import { InventoryItem } from "../Inventory";

export class SpecialItem extends InventoryItem {
    constructor(quantity: number = 1, description?: string, itemName?: string) {
        if (description != undefined) {
            super('Special Item', description, quantity);
        } else {
            super('Special Item', 'Description of the special item', quantity);
        }

        if (itemName) {
            this.name = itemName;
        }
    }

}