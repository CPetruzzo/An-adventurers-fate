import { sound } from "@pixi/sound";

// Mantén un registro de los efectos de sonido que se están reproduciendo
let activeSFX: { [name: string]: any } = {};

// Plays a specific sound with the given options (volume and looping) indefinitely until stopped
export interface SoundParams {
    name?: string; // Name of the audio file to be played
    volume?: number;
    loop?: boolean;
}

export function playSound(soundName: string, soundParams: SoundParams): void {
    const music = sound.find(soundName);
    music.play(soundParams);
}

export function stopSounds(sounds: any[]): void {
    sounds.forEach((music) => {
        if (music) {
            sound.stop(music);
        }
    });
}

export function stopAllSounds(): void {
    sound.stopAll();
}

export function pauseSounds(): void {
    sound.pauseAll();
}

export function resumeSounds(): void {
    sound.resumeAll();
}

export function playSFX(soundName: string, soundParams: SoundParams): void {
    const sfx = sound.find(soundName);
    const soundInstance = sfx.play(soundParams);
    activeSFX[soundName] = soundInstance; // Agrega el efecto de sonido activo al registro
}

export function stopSFX(soundName: string): void {
    const soundInstance = activeSFX[soundName];
    if (soundInstance) {
        soundInstance.stop(); // Detiene el efecto de sonido
        delete activeSFX[soundName]; // Elimina el efecto de sonido del registro
    }
}

export function stopAllSFX(): void {
    Object.values(activeSFX).forEach((soundInstance) => {
        soundInstance.stop(); // Detiene todos los efectos de sonido activos
    });
    activeSFX = {}; // Limpia el registro
}
