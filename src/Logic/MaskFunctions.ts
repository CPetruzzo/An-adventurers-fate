import { Graphics } from "@pixi/graphics";
import type { Text } from "@pixi/text";
import { Tween } from "tweedle.js";
import { getWrapCount } from "./TextPerLine";
import { Container } from "@pixi/display";
import { MASK_TIME, MASK_TIME_LINE_BY_LINE } from "../utils/constants";

export function applyMask(text: Text, backgroundColor: number): void {
	const textMask = new Graphics();
	textMask.beginFill(backgroundColor);
	textMask.drawRect(-text.width / 2, -text.height / 2, text.width, text.height);
	textMask.endFill();
	text.addChild(textMask);
	text.mask = textMask;
	setMaskAtribute(textMask);
}

function setMaskAtribute(textMask: any): void {
	textMask.scale.set(0, 0);
}

export function tweenMask(mask: any): void {
	new Tween(mask.scale)
		.to({ x: 1, y: 1 }, MASK_TIME)
		.start()
		.onComplete(() => {
			// mask.parent.removeChild(mask);
		});
}

// ///////////////////////////////

export function applyMask2(text: Text, backgroundColor: number): void {
	const textMask = new Graphics();
	textMask.beginFill(backgroundColor);
	textMask.drawRect(-text.width / 2, -text.height / 2, text.width, text.height);
	textMask.endFill();
	text.addChild(textMask);

	text.mask = textMask;
}

export function tweenMask2(mask: any): void {
	mask.scale.set(0, 1);
	new Tween(mask.scale)
		.to({ x: 1 }, MASK_TIME)
		.start()
		.onComplete(() => {
			mask.parent.removeChild(mask);
		});
}

// ///////////////////////////////

export function applyMask3(text: Text, backgroundColor: number): void {
	const textMask = new Graphics();
	textMask.beginFill(backgroundColor);
	textMask.drawRect(-text.width / 2, -text.height / 2, text.width, text.height);
	textMask.endFill();
	text.addChild(textMask);

	textMask.scale.set(1, 0);
	text.mask = textMask;
}

export function tweenMask3(mask: any): void {
	new Tween(mask.scale)
		.to({ x: 1, y: 1 }, MASK_TIME)
		.start()
		.onComplete(() => {
			mask.parent.removeChild(mask);
		});
}

// ///////////////////////////////

/** this mask applies line by line showing each line after another with an alpha */
export function applyMask4(text: Text, backgroundColor: number): void {
	const wrapCount = getWrapCount(text);
	const fontSize = typeof text.style.fontSize === "string" ? parseFloat(text.style.fontSize) : text.style.fontSize;

	if (fontSize) {
		const lineHeight = fontSize * 1.3;

		const textContainer = new Container();

		for (let i = 0; i < wrapCount; i++) {
			const textMask = new Graphics();
			textMask.beginFill(backgroundColor);
			textMask.drawRect(-text.width / 2, -text.height / 2 + lineHeight * i, text.width, lineHeight);
			textMask.endFill();
			textContainer.addChild(textMask);

			textMask.alpha = 0;

			new Tween(textMask)
				.to({ alpha: 1 }, MASK_TIME_LINE_BY_LINE)
				.delay(i * MASK_TIME_LINE_BY_LINE)
				.start();
		}

		text.parent.addChild(textContainer);

		textContainer.mask = text;
	}
}

function applyMaskLineByLine(text: Text, backgroundColor: number, maskFunction: (textMask: any, backgroundColor: number) => void): void {
	const wrapCount = getWrapCount(text);
	const fontSize = typeof text.style.fontSize === "string" ? parseFloat(text.style.fontSize) : text.style.fontSize;
	let lineHeight: number;
	if (fontSize) {
		lineHeight = fontSize * 1.3;

		const textContainer = new Container();

		for (let i = 0; i < wrapCount; i++) {
			const textMask = new Graphics();
			textMask.beginFill(backgroundColor);
			textMask.drawRect(-text.width / 2, -text.height / 2 + lineHeight * i, text.width, lineHeight);
			textMask.endFill();
			textContainer.addChild(textMask);

			maskFunction(textMask, backgroundColor);
		}


		text.parent.addChild(textContainer);

		maskFunction(text, backgroundColor);

		textContainer.mask = text;
	}

}

export function applyMaskLineByLine1(text: Text, backgroundColor: number): void {
	applyMaskLineByLine(text, backgroundColor, (mask) => {
		setMaskAtribute(mask);
		tweenMask(mask);
	});
}

export function applyMaskLineByLine2(text: Text, backgroundColor: number): void {
	applyMaskLineByLine(text, backgroundColor, applyMask2);
}

export function applyMaskLineByLine3(text: Text, backgroundColor: number): void {
	applyMaskLineByLine(text, backgroundColor, applyMask3);
}
