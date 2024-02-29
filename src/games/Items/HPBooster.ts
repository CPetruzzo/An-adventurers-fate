import { InventoryItem } from "../Inventory";

// Subclase para los aumentadores de HP
export class HPBooster extends InventoryItem {
    constructor(quantity: number = 1) {
        super('HP Booster', 'Increase maximum health when used', quantity);
    }

    public override use(): void {
        console.log('Se ha utilizado un aumentador de HP');
        // Implementación específica para usar un aumentador de HP
    }
}