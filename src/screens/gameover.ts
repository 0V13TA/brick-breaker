import { type GameState } from "../types";

export function update() {}

export function draw(gameState: GameState) {
  const ctx = gameState.ctx;

  ctx.save();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "red";
  ctx.font = "48px Arial";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", ctx.canvas.width / 2, ctx.canvas.height / 2);

  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText(
    "Press Space to Restart",
    ctx.canvas.width / 2,
    ctx.canvas.height / 2 + 50,
  );
  ctx.restore();
}
