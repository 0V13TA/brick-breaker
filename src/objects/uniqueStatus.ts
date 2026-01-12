import { PlayStatus, type GameState } from "../types";

export class UniqueStatusDrop {
  private readonly dy: number;
  private readonly color: string;
  private readonly gameState: GameState;
  private readonly ctx: CanvasRenderingContext2D;

  y: number;
  radius: number;
  readonly x: number;
  dropType: PlayStatus;

  constructor(
    startX: number,
    startY: number,
    dropType: PlayStatus,
    gameState: GameState,
  ) {
    this.x = startX;
    this.y = startY;
    this.dropType = dropType;
    this.gameState = gameState;
    this.ctx = this.gameState.ctx;
    this.dy = gameState.ballSpeed;
    this.radius = this.gameState.ballSize;

    switch (dropType) {
      case PlayStatus.BOMB:
        this.color = "black";
        break;
      case PlayStatus.SHOOTER:
        this.color = "blue";
        break;
      case PlayStatus.FIRE_BALL:
        this.color = "orange";
        break;
      case PlayStatus.GHOST_PADDLE:
        this.color = "#7a7a7a45";
        break;
      case PlayStatus.EXTRA_HEALTH:
        this.color = "red";
        break;
      case PlayStatus.LONGER_PADDLE:
        this.color = "lightgreen";
        break;
      case PlayStatus.REDUCED_SPEED:
        this.color = "lightbrown";
        break;
      case PlayStatus.INCREASED_SPEED:
        this.color = "magenta";
        break;
      case PlayStatus.REDUCED_BALL_SIZE:
        this.color = "rebbecapurple";
        break;
      case PlayStatus.INVERTED_CONTROLS:
        this.color = "aliceblue";
        break;
      case PlayStatus.REDUCED_PADDLE_SIZE:
        this.color = "goldenbrown";
        break;
      default:
        console.error("Invalid Drop Type", dropType);
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(
      this.x * this.ctx.canvas.width,
      this.y * this.ctx.canvas.height,
      this.radius * this.ctx.canvas.width,
      Math.PI * 2,
      0,
    );
    this.ctx.fill();
    this.ctx.stroke();
  }

  update() {
    this.y += this.dy;

    if (this.y >= 1) {
      const uniqueBallIndex = this.gameState.uniqueDropArray.findIndex((val) =>
        val === this ? true : false,
      );

      this.gameState.uniqueDropArray.splice(uniqueBallIndex, 1);
    }
  }
}
