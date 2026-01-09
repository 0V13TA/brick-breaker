import { Ball } from "../objects/ball";
import { Paddle } from "../objects/paddle";
import { PlayStatus, StatusNames, type GameState } from "../types";
import {
  checkCollisionCircleRec,
  handlePaddleCollisionSKill,
} from "../utils.ts";

let paddle: Paddle;
let ghost: Paddle | null;

export function init(gameState: GameState) {
  paddle = new Paddle(gameState);

  if (gameState.ballArray.length === 0) {
    const newBall = new Ball(
      gameState,
      paddle.x + paddle.width / 2,
      paddle.y + 0.01,
    );
    gameState.ballArray.push(newBall);
  }
}

export function update(gameState: GameState) {
  const isGhostActive = gameState.activeStatuses.findIndex(
    (val) => val.type === PlayStatus.GHOST_PADDLE,
  );
  gameState.activeStatuses = gameState.activeStatuses.filter((status) => {
    status.duration--; // Decrease time by 1 frame
    return status.duration > 0;
  });
  paddle.update();

  if (!gameState.ghostDrawn && isGhostActive > -1) {
    ghost = new Paddle(gameState, true);
    ghost.update();
  }

  gameState.ballArray.forEach((ball) => {
    if (checkCollisionCircleRec(paddle, ball)) {
      handlePaddleCollisionSKill(ball, paddle);
    }

    if (isGhostActive > -1 && checkCollisionCircleRec(paddle, ball)) {
      handlePaddleCollisionSKill(ball, paddle);
    }
  });
}

export function draw(gameState: GameState) {
  const ctx = gameState.ctx;
  const isGhostActive = gameState.activeStatuses.findIndex(
    (val) => val.type === PlayStatus.GHOST_PADDLE,
  );

  paddle.draw();
  if (isGhostActive > -1 && !gameState.ghostDrawn) {
    gameState.ghostDrawn = true;
    paddle.draw();
  }

  gameState.ballArray.forEach((ball) => ball.draw());
  gameState.blockArray.forEach((block) => block.draw());
  gameState.uniqueDropArray.forEach((drop) => drop.draw());

  drawUI(ctx, gameState);
}

function drawUI(ctx: CanvasRenderingContext2D, gameState: GameState) {
  const padding = 20;

  ctx.save();
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  // -- Lives --
  ctx.fillText(`Lives: ${gameState.life}`, padding, padding);

  // -- Active Statuses (Right Side) --
  ctx.textAlign = "right";
  let yPos = padding;

  gameState.activeStatuses.forEach((status) => {
    const name = StatusNames[status.type] || "Unknown";
    const secondsLeft = Math.ceil(status.duration / 60); // Assuming 60fps

    // Draw Status Name
    ctx.fillStyle = "#00ff88"; // Green text for buffs
    ctx.fillText(`${name} (${secondsLeft}s)`, ctx.canvas.width - padding, yPos);

    yPos += 30; // Move down for next item
  });

  ctx.restore();
}
