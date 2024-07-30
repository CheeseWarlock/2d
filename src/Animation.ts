class RendererAnimation {
  onUpdate?: (framesRemaining: number) => void;
  onComplete?: () => void;
  framesRemaining: number;

  constructor(options: {
    frames: number;
    onUpdate?: (framesRemaining: number) => void;
    onComplete?: () => void;
  }) {
    this.onComplete = options.onComplete;
    this.onUpdate = options.onUpdate;
    this.framesRemaining = options.frames;
  }

  tick() {
    this.framesRemaining -= 1;
    this.onUpdate?.(this.framesRemaining);
    if (!this.framesRemaining) {
      this.onComplete?.();
    }
  }

  get isComplete() {
    return this.framesRemaining === 0;
  }
}

export { RendererAnimation };
