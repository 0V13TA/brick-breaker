import { BlockType, type GameState, PlayStatus } from "../types";

export class Block {
  x: number;
  y: number;
  dx: number;
  color: string;
  width: number;
  height: number;
  private gameState: GameState;
  private ctx: CanvasRenderingContext2D;

  readonly type: BlockType;
  readonly content: PlayStatus | null;

  constructor(
    startX: number,
    startY: number,
    width: number,
    height: number,
    type: BlockType,
    gameState: GameState,
    hasContent: boolean = false,
  ) {
    this.x = startX;
    this.y = startY;
    this.width = width;
    this.height = height;
    this.type = type;
    this.gameState = gameState;
    this.ctx = this.gameState.ctx;

    if (type !== BlockType.DROP && hasContent) {
      throw new Error(
        `hasContent Can't Be true when type is not BlockType.Drop. type is currently ${this.type}`,
      );
    }

    if (hasContent) {
      const contents = [
        PlayStatus.BOMB,
        PlayStatus.SHOOTER,
        PlayStatus.FIRE_BALL,
        PlayStatus.GHOST_PADDLE,
        PlayStatus.EXTRA_HEALTH,
        PlayStatus.REDUCED_SPEED,
        PlayStatus.LONGER_PADDLE,
        PlayStatus.INCREASED_SPEED,
        PlayStatus.DUPLICATE_PADDLE,
        PlayStatus.INVERTED_CONTROLS,
        PlayStatus.REDUCED_BALL_SIZE,
        PlayStatus.REDUCED_PADDLE_SIZE,
      ];

      const index = Math.floor(Math.random() * (contents.length - 1));
      this.content = contents[index];
      console.log(
        `Block at (${this.x}, ${this.y}) has content: ${this.content}`,
      );
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.gameState.ctx.strokeStyle = "black";
    this.gameState.ctx.rect(
      this.x * this.ctx.canvas.width,
      this.y * this.ctx.canvas.height,
      this.width * this.ctx.canvas.width,
      this.height * this.ctx.canvas.height,
    );
    this.ctx.fill();
    this.ctx.stroke();
  }
}
