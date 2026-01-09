import { GameState } from "../types";
import { Paddle } from "./paddle"; // Import needed for type checks if desired

export class Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  speed: number; // Actual speed magnitude
  radius: number;
  color: string;
  private gameState: GameState;

  constructor(gameState: GameState, startX: number, startY: number) {
    this.gameState = gameState;
    this.x = startX;
    this.y = startY;
    this.radius = 0.015; // Adjusted relative to canvas size
    this.color = "red";

    // Initial speed
    this.speed = this.gameState.ballSpeed || 0.01;
    this.dx = this.speed;
    this.dy = -this.speed;
  }

  draw() {
    const ctx = this.gameState.ctx;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(
      this.x * ctx.canvas.width,
      this.y * ctx.canvas.height,
      this.radius * ctx.canvas.width, // Ensure radius scales with canvas
      Math.PI * 2,
      0,
    );
    ctx.fill();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    // Wall Collisions (Left/Right)
    if (this.x - this.radius < 0 || this.x + this.radius > 1) {
      this.dx *= -1;
      // Prevent getting stuck in wall
      this.x = this.x < 0.5 ? this.radius : 1 - this.radius;
    }

    // Ceiling Collision
    if (this.y - this.radius < 0) {
      this.dy *= -1;
      this.y = this.radius;
    }

    // Floor Collision (Game Over check usually happens here)
    if (this.y - this.radius > 1) {
      const ball = this.gameState.ballArray.findIndex((ball) => ball === this);
      this.gameState.ballArray.splice(ball, 1);
    }
  }
}
