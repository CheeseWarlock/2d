import {
  Application,
  Graphics,
  Container,
  FillGradient,
  Color,
  Text,
  Sprite,
} from "pixi.js";
import Game, { TIME_STOP_DURATION } from "../Game";
import GameObject from "../gameObjects/IGameObject";
import ColorGeometry from "../gameObjects/ColorGeometry";
import GroundGeometry from "../gameObjects/GroundGeometry";
import CameraFrameRenderer from "./CameraFrameRenderer";
import BaseGeometry from "../gameObjects/BaseGeometry";
import { GlowFilter } from "./filters/GlowFilter";
import { BUTTONS } from "../Controls";
import { DebugLevelManager } from "../DebugLevelManager";
import { EventDispatcher } from "../utils/EventDispatcher";
import { RendererAnimationEvents, Sprites } from "../types";
import { GAME_WIDTH, GAME_HEIGHT, DEBUG_MODE } from "../config";
import { RendererAnimation } from "../Animation";
import SafetyToggler from "../gameObjects/SafetyToggler";
import Player from "../gameObjects/Player";
import { CustomBloomFilter } from "./filters/CustomBloomFilter";
import { AudioManager, SOUND_EFFECTS } from "../AudioManager";
import OverlayManager from "../overlayObjects/OverlayManager";
import Button from "../overlayObjects/Button";
import TimeStopFilter from "./filters/TimeStopFilter";

/**
 * Number of frames to pause after a successful photo.
 */
const HANG_TIME = 15;

/**
 * The core of rendering the game window.
 */
class PixiRenderer {
  game: Game;
  objectsToDraw: Map<GameObject, Container> = new Map();
  mousePosition?: { x: number; y: number };
  viewRenderer: CameraFrameRenderer;
  goalRenderer: CameraFrameRenderer;
  app: Application;
  visualEffectTimers = {
    lastPhoto: 100,
    jump: 100,
  };
  animationEvents: EventDispatcher<RendererAnimationEvents> =
    new EventDispatcher();
  whiteMultiplier = 0;
  sprites: Sprites;
  startScreenClosed: boolean = false;
  renderedText?: Container[];
  animations: RendererAnimation[] = [];
  glowFilter: GlowFilter;
  shockwaveFilter: TimeStopFilter;
  customBloomFilter: CustomBloomFilter;
  audioManager: AudioManager = new AudioManager();
  overlayManager: OverlayManager = new OverlayManager();
  renderedOverlayItems: Map<Button, Container> = new Map();
  audioButton?: Button;

  constructor(options: { app: Application; sprites: Sprites }) {
    this.app = options.app;
    this.sprites = options.sprites;

    this.game = new Game();
    this.setupGame();

    if (DEBUG_MODE) {
      new DebugLevelManager(this);
    }

    const backgroundGradient = new FillGradient(0, 0, 0, GAME_HEIGHT);
    backgroundGradient.addColorStop(0, "#222");
    backgroundGradient.addColorStop(1, "#444");

    const background = new Graphics()
      .rect(0, 0, GAME_WIDTH, GAME_HEIGHT)
      .fill(backgroundGradient);

    this.app.stage.addChild(background);

    this.createStars();

    const viewContainer = document.getElementById("view-camera-container")!;
    const goalContainer = document.getElementById("goal-camera-container")!;
    this.viewRenderer = new CameraFrameRenderer(viewContainer, "View");
    this.goalRenderer = new CameraFrameRenderer(goalContainer, "Goal");

    this.shockwaveFilter = new TimeStopFilter({
      center: {
        x: 0.5,
        y: 0.5,
      },
      speed: 1,
      amplitude: 12,
      wavelength: 250,
      brightness: 1.15,
      radius: 2000,
    });
    this.customBloomFilter = new CustomBloomFilter();
    this.glowFilter = new GlowFilter();

    this.app.stage.filters = [
      this.glowFilter,
      this.shockwaveFilter,
      this.customBloomFilter,
    ];

    this.setupInteractionEvents();
    this.app.stage.addChild(this.sprites.playerWalkSprite);
    this.app.stage.addChild(this.sprites.viewCone);

    this.app.ticker.add(() => {
      this.update();
    });

    this.buildInitialText();
  }

  setupGame() {
    this.game.setupAnimationCallbacks(this.animationEvents);
    this.game.events.on("goalAchieved", () => {
      this.goalRenderer.element.classList.remove("camera-container-bounce");
      this.goalRenderer.element.offsetHeight;
      this.goalRenderer.element.classList.add("camera-container-bounce");
      this.game.gameIsActive = false;
      this.animations.push(
        new RendererAnimation({
          frames: HANG_TIME,
          onComplete: () => {
            this.game.gameIsActive = true;
          },
        })
      );
    });
    this.game.events.on("photoFailed", () => {
      this.audioManager.playSoundEffect(SOUND_EFFECTS.CAMERA_REJECTED);
      this.viewRenderer.element.classList.remove("view-container-shake");
      this.viewRenderer.element.offsetHeight;
      this.viewRenderer.element.classList.add("view-container-shake");
    });
    this.game.events.on("photoTaken", (ev) => {
      this.animations.push(
        new RendererAnimation({
          frames: 50,
          onUpdate: (framesRemaining: number) => {
            this.sprites.viewCone.alpha = Math.max(
              0.5,
              0.5 + framesRemaining / 100
            );
            this.visualEffectTimers.lastPhoto = 50 - framesRemaining;
          },
        })
      );
      if (ev.photosRemaining) {
        this.audioManager.playSoundEffect(SOUND_EFFECTS.CAMERA_SHUTTER);
      } else {
        this.audioManager.playSoundEffect(SOUND_EFFECTS.LEVEL_CHANGE);
        this.goalRenderer.element.classList.remove("camera-container-bounce");
        this.goalRenderer.element.offsetHeight;
        this.goalRenderer.element.classList.add("camera-container-bounce");
        // start fading out the screen
        this.animations.push(
          new RendererAnimation({
            frames: 50,
            onUpdate: () => {
              this.whiteMultiplier += 0.02;
            },
            onComplete: () => {
              this.animationEvents.publish(
                "levelCompleteAnimationMidTransition"
              );
              this.animations.push(
                new RendererAnimation({
                  frames: 50,
                  onUpdate: () => {
                    this.whiteMultiplier -= 0.02;
                  },
                  onComplete: () => {
                    this.animationEvents.publish(
                      "levelCompleteAnimationFinished"
                    );
                  },
                })
              );
            },
          })
        );
      }
    });
    this.game.events.on("playerDied", () => {
      this.glowFilter.focusDistance = 1400;
    });
    this.game.events.on("playerJumped", () => {
      this.visualEffectTimers.jump = 0;
    });
    this.game.events.on("playerTouchedToggle", (pos) => {
      this.shockwaveFilter.center.x = pos.x;
      this.shockwaveFilter.center.y = pos.y;
    });
    this.game.events.on("levelChanged", () => {
      if (
        this.game.levelManager.currentLevelIndex ===
        this.game.levelManager.levelCount - 1
      ) {
        this.buildEndingText();
      }
    });
    this.createAudioButtons();
  }

  createAudioButtons() {
    if (this.audioButton) {
      this.overlayManager.buttons.delete(this.audioButton);
    }
    const newAudioButton = new Button(
      `Audio: O${this.audioManager.userAudioEnabled ? "n" : "ff"}`,
      {
        centerY: 800,
      }
    );
    this.overlayManager.buttons.add(newAudioButton);
    newAudioButton.on("click", () => {
      this.audioManager.userAudioEnabled = !this.audioManager.userAudioEnabled;
      this.createAudioButtons();
    });
    this.audioButton = newAudioButton;
  }

  setupInteractionEvents() {
    document.onmousemove = (ev) => {
      const canvasX = this.app.canvas.getBoundingClientRect().left;
      const canvasY = this.app.canvas.getBoundingClientRect().top;

      this.mousePosition = {
        x: ev.clientX - canvasX,
        y: ev.clientY - canvasY,
      };
    };

    document.onmousedown = () => {
      // check zones of overlay items
      let foundOverlayItem: Button | null = null;
      this.overlayManager.buttons.forEach((button) => {
        if (!this.mousePosition) return;
        if (
          this.mousePosition.x > button.centerX - button.width / 2 &&
          this.mousePosition.x < button.centerX + button.width / 2 &&
          this.mousePosition.y > button.centerY - button.height / 2 &&
          this.mousePosition.y < button.centerY + button.height / 2
        ) {
          foundOverlayItem = button;
        }
      });
      if (foundOverlayItem) {
        (foundOverlayItem as Button).publish("click");
        return;
      }
      if (this.startScreenClosed) {
        this.game.controls.press(BUTTONS.CLICK);
      } else {
        if (this.audioManager.userAudioEnabled) {
          this.audioManager.setup();
        }
        this.overlayManager.buttons.clear();
        this.audioManager.playSoundEffect(SOUND_EFFECTS.BACKGROUND_MUSIC, true);
        this.animations.push(
          new RendererAnimation({
            frames: 20,
            onUpdate: (framesRemaining) => {
              this.sprites.titleText.alpha = framesRemaining * 0.05;
              if (this.renderedText) {
                this.renderedText.forEach(
                  (text) => (text.alpha = framesRemaining * 0.05)
                );
              }
            },
            onComplete: () => {
              this.sprites.titleText.alpha = 0;
              if (this.renderedText) {
                this.renderedText.forEach((text) => (text.alpha = 0));
              }
            },
          })
        );
      }
      this.startScreenClosed = true;
    };

    document.onmouseup = () => {
      this.game.controls.unpress(BUTTONS.CLICK);
    };

    document.body.onkeydown = (ev) => {
      this.game.controls.pressFromKey(ev.key);
    };

    document.body.onkeyup = (ev) => {
      this.game.controls.unpressFromKey(ev.key);
    };
  }

  buildInitialText() {
    this.app.stage.addChild(this.sprites.titleText);
    this.sprites.titleText.anchor = 0.5;
    this.sprites.titleText.x = 500;
    this.sprites.titleText.y = 200;
    this.sprites.titleText.zIndex = 1;

    const clickToStartText = new Text({
      text: "Mouse + Arrow Keys / WASD\nClick to Start",
      style: {
        fill: "white",
        fontSize: "26px",
        fontFamily: this.sprites.font.family,
        align: "center",
      },
    });
    this.app.stage.addChild(clickToStartText);
    clickToStartText.anchor = 0.5;
    clickToStartText.x = 500;
    clickToStartText.y = 700;
    clickToStartText.zIndex = 1;

    const subtitleText = new Text({
      text: "A Game of One-Dimensional Photography",
      style: {
        fill: "white",
        fontSize: "26px",
        fontFamily: this.sprites.font.family,
        padding: 5,
      },
    });
    this.app.stage.addChild(subtitleText);
    subtitleText.anchor = 0.5;
    subtitleText.x = 500;
    subtitleText.y = 280;
    subtitleText.zIndex = 1;

    const framingLines = new Graphics()
      .moveTo(300, 254)
      .lineTo(700, 254)
      .moveTo(300, 298)
      .lineTo(700, 298)
      .setStrokeStyle({
        width: 2,
        color: "white",
      })
      .stroke();
    framingLines.zIndex = 1;
    this.app.stage.addChild(framingLines);
    this.renderedText = [subtitleText, clickToStartText, framingLines];
  }

  buildEndingText() {
    const text = new Text({
      text: "More Levels Coming Soon",
      style: {
        fill: "white",
        fontSize: "40px",
        fontFamily: this.sprites.font.family,
      },
    });
    text.anchor = 0.5;
    text.x = 500;
    text.y = 300;
    text.zIndex = 1;
    this.app.stage.addChild(text);
    this.renderedText = [text];
  }

  update() {
    if (this.game.timeUntilColorObjectsUnsafe > TIME_STOP_DURATION / 2) {
      this.shockwaveFilter.time =
        (TIME_STOP_DURATION - this.game.timeUntilColorObjectsUnsafe) / 10 - 0.1;
    } else {
      this.shockwaveFilter.time =
        this.game.timeUntilColorObjectsUnsafe / 10 - 0.1;
    }
    // this.shockwaveFilter.time += 0.1;

    // Handle animations
    this.animations.forEach((anim) => {
      anim.tick();
    });
    this.animations = this.animations.filter((anim) => !anim.isComplete);

    // Color fades
    this.visualEffectTimers.jump += 1;
    if (this.game.gameIsActive) {
      this.glowFilter.time += 0.02;
    }

    // set the white fade to the max of fade for any reason
    this.customBloomFilter.white = Math.min(
      1,
      Math.max(0, 1 - this.visualEffectTimers.lastPhoto / 50)
    );
    this.glowFilter.screenFade = Math.min(
      1,
      Math.max(0, this.whiteMultiplier * 4 - 3)
    );
    this.game.focusPoint = this.mousePosition;

    this.game.tick();

    if (this.game.player.isDead) {
      this.glowFilter.black += 0.02;
      if (this.glowFilter.black > 0.2) {
        this.glowFilter.black = 0.2;
      }
      this.glowFilter.focusDistance -= 50;
      if (this.glowFilter.focusDistance < 100) {
        this.glowFilter.focusDistance = 100;
      }
      this.glowFilter.focusX = this.game.player.x;
      this.glowFilter.focusY = this.game.player.y;
      this.sprites.viewCone.visible = false;
      this.app?.stage.removeChild(this.sprites.playerWalkSprite);
      this.app?.stage.addChild(this.sprites.playerDeadSprite);
      this.sprites.playerDeadSprite.scale.x =
        (this.game.viewDirection || 0) < -(Math.PI / 2) ||
        (this.game.viewDirection || 0) > Math.PI / 2
          ? -1
          : 1;
      this.sprites.playerDeadSprite.x = this.game.player.x;
      this.sprites.playerDeadSprite.y = this.game.player.y;
    } else {
      this.glowFilter.black = 0;
      this.app?.stage.removeChild(this.sprites.playerDeadSprite);
      this.app?.stage.addChild(this.sprites.playerWalkSprite);
      if (this.visualEffectTimers.jump < 20) {
        this.sprites.playerWalkSprite.currentFrame = 1;
      }

      this.sprites.playerWalkSprite.scale.x =
        (this.game.viewDirection || 0) < -(Math.PI / 2) ||
        (this.game.viewDirection || 0) > Math.PI / 2
          ? -1
          : 1;
      if (this.game.player.isWalking) {
        if (!this.sprites.playerWalkSprite.playing) {
          this.sprites.playerWalkSprite.currentFrame = 1;
        }
        this.sprites.playerWalkSprite.play();
      } else {
        if (this.visualEffectTimers.jump > 20) {
          this.sprites.playerWalkSprite.currentFrame = 0;
        }

        this.sprites.playerWalkSprite.stop();
      }
      if (!this.game.gameIsActive) {
        this.sprites.playerWalkSprite.stop();
      }
      this.viewRenderer.drawCamera(this.game.cameraFrame);
      this.goalRenderer.drawCamera(
        this.game.goals[this.game.currentGoalIndex] ||
          this.game.goals[this.game.currentGoalIndex - 1]
      );
      this.sprites.playerWalkSprite.x = this.game.player.x;
      this.sprites.playerWalkSprite.y = this.game.player.y;

      if (this.game.viewOrigin) {
        this.sprites.viewCone.visible = true;
        this.sprites.viewCone.x = this.game.viewOrigin.x || 0;
        this.sprites.viewCone.y = this.game.viewOrigin.y || 0;
        this.sprites.viewCone.rotation = this.game.viewDirection || 0;
      } else {
        this.sprites.viewCone.visible = false;
      }
    }

    // Clean up
    Array.from(this.objectsToDraw.keys()).forEach((obj) => {
      if (obj instanceof BaseGeometry) {
        if (this.game.visibleObjects.indexOf(obj) === -1) {
          this.objectsToDraw.get(obj)?.destroy();
          this.objectsToDraw.delete(obj);
        }
      }
    });
    this.game.visibleObjects.forEach((obj) => {
      if (obj instanceof Player) return;
      if (!this.objectsToDraw.has(obj)) {
        let newGraphics;
        if (obj instanceof ColorGeometry) {
          const uhg = obj.lineSegments
            .map((seg) => {
              return [seg.from.x, seg.from.y];
            })
            .flat();
          newGraphics = new Graphics()
            .poly(
              obj.points
                .map((seg) => {
                  return [seg.x, seg.y];
                })
                .flat()
            )
            .fill(obj.color);
          newGraphics.x = obj.position.x + obj.transform.x;
          newGraphics.y = obj.position.y + obj.transform.y;
          newGraphics.rotation = obj.currentRotation;
        } else if (obj instanceof GroundGeometry) {
          newGraphics = new Graphics()
            .poly(
              obj.lineSegments.map((seg) => [seg.from.x, seg.from.y]).flat()
            )
            .fill(obj.color);
        } else if (obj instanceof SafetyToggler) {
          newGraphics = this.sprites.createTimerSprite();
          newGraphics.position.x = obj.position.x;
          newGraphics.position.y = obj.position.y;
        } else {
          newGraphics = new Graphics().circle(0, 0, 50).fill("black");
        }

        this.objectsToDraw.set(obj, newGraphics);
        this.app.stage.addChild(newGraphics);
      } else {
        const existingGraphics = this.objectsToDraw.get(obj)!;
        if (obj instanceof ColorGeometry) {
          existingGraphics.x = obj.position.x + obj.transform.x;
          existingGraphics.y = obj.position.y + obj.transform.y;
          existingGraphics.rotation = obj.currentRotation;
        }
      }
    });

    this.drawOverlay();
  }

  drawOverlay() {
    this.overlayManager.buttons.forEach((button) => {
      if (!this.renderedOverlayItems.has(button)) {
        const bgGfx = new Graphics()
          .roundRect(
            button.centerX - button.width / 2,
            button.centerY - button.height / 2,
            button.width,
            button.height,
            8
          )
          .setStrokeStyle({ width: 2, color: "#ddd" })
          .stroke();
        const text = new Text({
          text: button.title,
          style: {
            fill: "#fff",
            fontSize: "26px",
            fontFamily: this.sprites.font.family,
          },
        });
        text.anchor = 0.5;
        text.x = button.centerX;
        text.y = button.centerY;
        text.zIndex = 1;
        const container = new Container();
        container.addChild(bgGfx);
        container.addChild(text);
        container.zIndex = 10;
        this.app.stage.addChild(container);
        this.renderedOverlayItems.set(button, container);
      }
    });

    // Remove the overlayitems that are no longer in buttons
    this.renderedOverlayItems.forEach((container, button) => {
      if (!this.overlayManager.buttons.has(button)) {
        this.renderedOverlayItems.delete(button);
        this.app.stage.removeChild(container);
      }
    });
  }

  createStars() {
    const NUM_STARS = 32;
    let starsRemaining = NUM_STARS;
    while (starsRemaining > 0) {
      starsRemaining -= 1;
      const starX = Math.round(Math.random() * GAME_WIDTH);
      const starY = Math.round(Math.random() ** 2 * GAME_HEIGHT);
      const starSize = Math.random() * 3 + 3;
      const starBrightness =
        ((GAME_HEIGHT - starY) * 127) / GAME_HEIGHT + 128 - Math.random() * 50;

      const starRect = new Graphics()
        .rect(0, 0, starSize, starSize)
        .fill(`rgb(${starBrightness},${starBrightness},${starBrightness})`);
      starRect.x = starX;
      starRect.y = starY;
      if (Math.random() > 0.6) {
        starRect.rotation = Math.PI / 4;
      }
      this.app!.stage.addChild(starRect);
    }
  }
}

export default PixiRenderer;
