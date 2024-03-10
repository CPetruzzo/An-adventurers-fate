import { LevelCreator } from "./LevelCreator";

export interface LevelNeighbor {
	levelId: string;
	direction: string;
}

export interface LevelNeighbours {
	levelId: string;
	neighbors: LevelNeighbor[];
}

// Supongamos que tienes un array de datos de nivel
export const levelsData: LevelNeighbours[] = [];

// Crear un diccionario para almacenar las conexiones entre niveles
export const levelConnections: Map<string, LevelNeighbor[]> = new Map();

// Parsear la información de vecinos y establecer conexiones
levelsData.forEach((level) => {
	levelConnections.set(level.levelId, level.neighbors);
});

// Lógica para navegar entre niveles
export function navigateToNeighborLevel(currentLevelId: string, direction: string): void {
	const neighbors = levelConnections.get(currentLevelId);
	if (neighbors) {
		const neighbor = neighbors.find((neighbor) => neighbor.direction === direction);
		if (neighbor) {
			const neighborLevelId = neighbor.levelId;
			// Lógica para cargar o cambiar al nivel vecino
			console.log(`Navigating from ${currentLevelId} to ${neighborLevelId} in direction ${direction}`);
		} else {
			console.log(`No neighbor found in direction ${direction}`);
		}
	} else {
		console.log(`Level ${currentLevelId} has no neighbors`);
	}
}

export function obtenerDatosDeNiveles(level: LevelCreator): LevelNeighbours[] {
	const levels = level.mapData.levels;
	const levelsData: LevelNeighbours[] = [];

	for (let i = 0; i < levels.length; i++) {
		const levelData: LevelNeighbours = {
			neighbors: levels[i].__neighbours.map((neighbour: { levelIid: any; dir: any }) => ({
				levelId: neighbour.levelIid,
				direction: neighbour.dir,
			})),
			levelId: "",
		};
		levelsData.push(levelData);
	}

	return levelsData;
}
