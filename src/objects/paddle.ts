import type { GameState } from "../types";

export class Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  private gameState: GameState;
  private ctx: CanvasRenderingContext2D;
  // Make these public or keep private and use inside update
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

  // UPDATED: Now takes the set of active keys
  update(keysPressed: Set<string>) {
    // Check if our specific buttons are pressed
    if (keysPressed.has(this.leftButton)) {
      this.x -= this.gameState.paddleSpeed;
    }

    if (keysPressed.has(this.rightButton)) {
      this.x += this.gameState.paddleSpeed;
    }

    // Boundary Checks
    if (this.x <= 0) this.x = 0;
    if (this.x + this.width >= 1) this.x = 1 - this.width;
  }
}
