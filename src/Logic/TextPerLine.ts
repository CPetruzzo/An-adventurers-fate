import type { Text } from "@pixi/text";
import { TextMetrics } from "@pixi/text";

/**
 * This function returns the number of lines generated due to word wrapping.
 */
export function getWrapCount(text: Text): number {
	const metrics: TextMetrics = TextMetrics.measureText(text.text, text.style);
	return metrics.lines.length;
}
