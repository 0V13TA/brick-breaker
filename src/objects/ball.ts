import { GameState } from "../types";

export class Ball {
  x: number;
  y: number;
  radius: number;
  color: string;
  private gameState: GameState;

  constructor(gameState: GameState, startX: number, startY: number) {
    this.gameState = gameState;
    this.x = startX;
    this.y = startY;
  }

  draw() {
    this.gameState.ctx.beginPath();
    this.gameState.ctx.fillStyle = this.color;
    this.gameState.ctx.arc(this.x, this.y, this.radius, Math.PI * 2, 0);
    this.gameState.ctx.fill();
  }
}
