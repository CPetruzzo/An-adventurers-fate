import { sound } from "@pixi/sound";

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
