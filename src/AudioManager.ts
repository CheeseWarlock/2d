import audioUrl from "./images/switchback2.mp3";

export class AudioManager {
  audioElement: HTMLAudioElement;
  audioContext?: AudioContext;

  constructor() {
    console.log("Audio @ ", audioUrl);
    this.audioElement = document.createElement("audio");
    document.body.appendChild(this.audioElement);
    this.audioElement.src = new URL(
      "./images/switchback2.mp3",
      import.meta.url
    ).href;
  }

  play() {
    this.audioContext = new AudioContext();
    const track = this.audioContext.createMediaElementSource(this.audioElement);
    track.connect(this.audioContext.destination);
    console.log("Loading audio?");
    // Check if context is in suspended state (autoplay policy)

    // Play or pause track depending on state
    this.audioElement.play();
    console.log("plastas");
  }
}
