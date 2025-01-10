import backgroundMusic from "./assets/switchback2.mp3";
import cameraSound from "./assets/camera1.wav";
import cameraRejectedSound from "./assets/camera2.wav";
import levelChangeSound from "./assets/camera1win.wav";
import { AUDIO_ENABLED } from "./config";

export enum SOUND_EFFECTS {
  /**
   * The main background music, "switchback"
   */
  BACKGROUND_MUSIC = "bgm",
  /**
   * A camera shutter sound
   */
  CAMERA_SHUTTER = "camera",
  /**
   * A short buzzer sound
   */
  CAMERA_REJECTED = "camera-rejected",
  /**
   * A wind sound
   */
  LEVEL_CHANGE = "level-change",
}

const SOUND_FILES: Record<SOUND_EFFECTS, string> = {
  [SOUND_EFFECTS.BACKGROUND_MUSIC]: backgroundMusic,
  [SOUND_EFFECTS.CAMERA_SHUTTER]: cameraSound,
  [SOUND_EFFECTS.CAMERA_REJECTED]: cameraRejectedSound,
  [SOUND_EFFECTS.LEVEL_CHANGE]: levelChangeSound,
};

/**
 * Loads and manages audio files.
 */
export class AudioManager {
  audioElements: Partial<Record<SOUND_EFFECTS, HTMLAudioElement>>;
  audioContext?: AudioContext;

  constructor() {
    this.audioElements = {};

    Object.keys(SOUND_FILES).forEach((key) => {
      const audioElement = document.createElement("audio");
      document.body.appendChild(audioElement);
      audioElement.src = SOUND_FILES[key as SOUND_EFFECTS];
      this.audioElements[key as SOUND_EFFECTS] = audioElement;
    });
  }

  /**
   * Set up audio context to play sounds.
   * Must be called before `playSoundEffect`.
   * Can only be called after the user has interacted with the game.
   */
  setup() {
    if (!AUDIO_ENABLED) return;
    const audioContext = new AudioContext();
    this.audioContext = audioContext;
    Object.keys(SOUND_FILES).forEach((key) => {
      const audioElement = this.audioElements[key as SOUND_EFFECTS]!;
      const track = audioContext.createMediaElementSource(audioElement);
      track.connect(audioContext.destination);
    });
  }

  /**
   * Play a sound, restarting it if it's already playing.
   */
  playSoundEffect(sound: SOUND_EFFECTS, loop: boolean = false) {
    if (!AUDIO_ENABLED) return;
    if (!this.audioContext) return;
    const audioElement = this.audioElements[sound];
    if (!audioElement) return;
    audioElement.currentTime = 0;
    audioElement.play();
    audioElement.loop = loop;
  }
}
