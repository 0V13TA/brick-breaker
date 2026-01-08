import type { GameState } from "../types";

export class Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  private gameState: GameState;
  private ctx: CanvasRenderingContext2D;
  private leftButton: string = "ArrowLeft";
  private rightButton: string = "ArrowRight";

  constructor(gameState: GameState, isGhost: boolean = false) {
    this.x = 0.4;
    this.y = 0.93;
    this.width = 0.2;
    this.height = 0.03;
    this.color = "darkgreen";
    this.gameState = gameState;
    this.ctx = this.gameState.ctx;

    if (isGhost) {
      this.leftButton = "ArrowRight";
      this.rightButton = "ArrowLeft";
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = "black";
    this.ctx.rect(
      this.x * this.ctx.canvas.width,
      this.y * this.ctx.canvas.height,
      this.width * this.ctx.canvas.width,
      this.height * this.ctx.canvas.height,
    );
    this.ctx.fill();
    this.ctx.stroke();
  }

  move(e: KeyboardEvent) {
    if (e.key === this.leftButton) {
      this.x -= this.gameState.paddleSpeed;
    }

    if (e.key === this.rightButton) {
      this.x += this.gameState.paddleSpeed;
    }
  }

  update() {
    if (this.x <= 0 || this.x + this.width >= 1) {
      this.x = Math.max(0, Math.min(this.x, 1 - this.width));
    }
  }
}
