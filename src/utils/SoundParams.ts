import { sound } from "@pixi/sound";
import { DEBUG_SFX, DEBUG_SOUND } from "./constants";

// Mantén un registro de los efectos de sonido que se están reproduciendo
let activeSFX: { [name: string]: any } = {};
// Mantén un registro de los sonidos de fondo que se están reproduciendo
let activeSounds: { [name: string]: any } = {};

// Plays a specific sound with the given options (volume and looping) indefinitely until stopped
export interface SoundParams {
  name?: string; // Name of the audio file to be played
  volume?: number;
  loop?: boolean;
}

export function playSound(soundName: string, soundParams: SoundParams): void {
  if (!DEBUG_SOUND) {
    const soundTrack = sound.find(soundName);
    if (!soundTrack.isPlaying) {
      const soundInstance = soundTrack.play(soundParams);
      activeSounds[soundName] = soundInstance; // Add the active sound track to the registry
    } else {
      console.log(`${soundName} is already playing`);
    }
  }
}

export function stopSounds(sounds: any[]): void {
  sounds.forEach((music) => {
    if (music) {
      sound.stop(music);
      // Remove the sound from the activeSFX or activeSounds registry
      delete activeSFX[music.name];
      delete activeSounds[music.name];
    }
  });
}

export function stopAllSounds(): void {
  Object.values(activeSounds).forEach((soundInstance) => {
    soundInstance.stop(); // Detiene todos los sonidos de fondo activos
  });
  activeSounds = {}; // Limpia el registro de sonidos de fondo activos
}

export function pauseSounds(): void {
  sound.pauseAll();
}

export function resumeSounds(): void {
  sound.resumeAll();
}

export function playSFX(soundName: string, soundParams: SoundParams): void {
  if (!DEBUG_SFX) {
    const sfx = sound.find(soundName);
    if (!sfx.isPlaying) {
      const soundInstance = sfx.play(soundParams);
      activeSFX[soundName] = soundInstance; // Agrega el efecto de sonido activo al registro
    } else {
      console.log(`${soundName} is already playing`);
    }
  }
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
    console.log("soundInstance", soundInstance);
    soundInstance.stop(); // Detiene todos los efectos de sonido activos
  });
  activeSFX = {}; // Limpia el registro
}

export function playSoundTrack(
  soundName: string,
  soundParams: SoundParams
): void {
  const soundTrack = sound.find(soundName);
  if (!soundTrack.isPlaying && !Object.keys(activeSounds).includes(soundName)) {
    const soundInstance = soundTrack.play(soundParams);
    activeSounds[soundName] = soundInstance; // Agrega el sonido de fondo activo al registro
  } else {
    console.log(`${soundName} is already playing or has been played before.`);
  }
}

export function stopSoundTrack(soundName: string): void {
  const soundInstance = activeSounds[soundName];
  if (soundInstance) {
    soundInstance.stop(); // Detiene el sonido de fondo
    delete activeSounds[soundName]; // Elimina el sonido de fondo del registro
  }
}

export function stopAllSoundTracks(): void {
  Object.values(activeSounds).forEach((soundInstance) => {
    soundInstance.stop(); // Detiene todos los sonidos de fondo activos
  });
  activeSounds = {}; // Limpia el registro de sonidos de fondo activos
}

export function setVolume(value: number): void {
  sound.volumeAll = value;
  console.log(getGlobalVolume());
}

export function getGlobalVolume(): number {
  return sound.volumeAll;
}
