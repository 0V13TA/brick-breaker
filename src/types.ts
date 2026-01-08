import { Ball } from "./objects/ball.ts";
import { Block } from "./objects/block.ts";
import { Shooter } from "./objects/shooter.ts";
import { UniqueStatusDrop } from "./objects/uniqueStatus";

export enum GameScreen {
  PAUSE_SCREEN,
  GAME_PLAY,
  GAME_OVER,
}

export enum PlayStatus {
  BOMB,
  SHOOTER,
  FIRE_BALL,
  GHOST_PADDLE,
  EXTRA_HEALTH,
  REDUCED_SPEED,
  LONGER_PADDLE,
  INCREASED_SPEED,
  DUPLICATE_PADDLE,
  INVERTED_CONTROLS,
  REDUCED_BALL_SIZE,
  REDUCED_PADDLE_SIZE,
}

export enum BlockType {
  DROP,
  NORMAL,
  INDESTRUCTIBLE,
}

type Volume = {
  music: number;
  effects: number;
  general: number;
};

export type GameState = {
  life: number;
  volume: Volume;
  ballSize: number;
  bombCount: number;
  dropSpeed: number;
  ballSpeed: number;
  ghostDrawn: boolean;
  paddleSpeed: number;
  gameScreen: GameScreen;
  ctx: CanvasRenderingContext2D;

  ballArray: Ball[];
  blockArray: Block[];
  shooterArray: Shooter[];
  gameStatus: PlayStatus[];
  uniqueDropArray: UniqueStatusDrop[];
};
