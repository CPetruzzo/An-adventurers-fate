import { InventoryItem } from "../Inventory";

// Subclase para las pociones de salud
export class HealthPotion extends InventoryItem {
    constructor(quantity: number = 1) {
        super('Health Potion', 'Restore a small amount of health when used', quantity);
    }

    public override use(): void {
        console.log('Se ha utilizado una poción de salud');
        // Implementación específica para usar una poción de salud
    }
}