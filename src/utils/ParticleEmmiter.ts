import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import particle from "../../static/emitter.json";
import { Container, Texture } from "pixi.js";

export class ParticleEmitter extends Emitter {
	constructor(particleContainer: Container) {
		super(particleContainer, upgradeConfig(particle, [Texture.from("particle.png")]));
	}
}
