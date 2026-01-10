import { LAYOUT, level1 } from "../data.ts";
import { Ball } from "../objects/ball";
import { Block } from "../objects/block.ts";
import { Paddle } from "../objects/paddle";
import {
  BlockType,
  GameScreen,
  PlayStatus,
  StatusNames,
  type GameState,
} from "../types";
import {
  checkCollisionCircleRec,
  getCollisionDirection,
  handlePaddleCollisionSKill,
} from "../utils.ts";

let paddle: Paddle;
let ghost: Paddle | null = null;

export function init(gameState: GameState) {
  paddle = new Paddle(gameState);

  if (gameState.ballArray.length === 0) {
    const newBall = new Ball(
      gameState,
      paddle.x + paddle.width / 2,
      paddle.y - 0.02,
    );
    gameState.ballArray.push(newBall);
  }

  gameState.blockArray = [];
  createLevel(gameState);

  addEventListener("keydown", (e) => {
    if (gameState.gameScreen === GameScreen.GAME_PLAY) {
      paddle.move(e);
      ghost?.move(e);
    }
  });
}

function createLevel(gameState: GameState) {
  // Use the length of the first row to determine columns
  const numCols = level1[0].length;

  // 1. Calculate Available Width
  // Total width (1.0) minus Left Margin minus Right Margin
  const totalAvailableWidth = 1.0 - LAYOUT.marginLeft - LAYOUT.marginRight;

  // 2. Calculate Total Space taken by Gaps
  // If we have 10 columns, there are 9 gaps between them
  const totalGapWidth = (numCols - 1) * LAYOUT.gap;

  // 3. Calculate Single Block Width
  const blockWidth = (totalAvailableWidth - totalGapWidth) / numCols;

  level1.forEach((row, rowIndex) => {
    row.forEach((cellValue, colIndex) => {
      if (cellValue === 0) return;

      // 4. Calculate Position
      // Start at Margin + (BlockWidth * ColIndex) + (Gap * ColIndex)
      const x = LAYOUT.marginLeft + colIndex * (blockWidth + LAYOUT.gap);

      // Start at MarginTop + (BlockHeight * RowIndex) + (Gap * RowIndex) + Tiny Padding
      const y =
        LAYOUT.marginTop + rowIndex * (LAYOUT.rowHeight + LAYOUT.gap) + 0.01;

      let type = BlockType.NORMAL;
      let hasContent = false;

      if (cellValue === 2) {
        type = BlockType.DROP;
        hasContent = true;
      } else if (cellValue === 4) {
        type = BlockType.INDESTRUCTIBLE;
      }

      const block = new Block(
        x,
        y,
        blockWidth,
        LAYOUT.rowHeight,
        type,
        gameState,
        hasContent,
      );

      gameState.blockArray.push(block);
    });
  });
}

function resetBall(gameState: GameState) {
  gameState.ballArray = []; // Clear old balls
  // Re-run init to spawn a fresh ball
  init(gameState);
}

export function update(gameState: GameState) {
  // filter out the statuses that has ended
  gameState.activeStatuses = gameState.activeStatuses.filter((status) => {
    status.duration--; // Decrease time by 1 frame
    return status.duration > 0;
  });

  const isGhostActive = gameState.activeStatuses.findIndex(
    (val) => val.type === PlayStatus.GHOST_PADDLE,
  );

  paddle.update();

  if (!gameState.ghostDrawn && isGhostActive > -1) {
    ghost = new Paddle(gameState, true);
    ghost.update();
  } else if (isGhostActive < 0) {
    ghost = null;
  }

  gameState.blockArray.forEach((block, index) => {
    gameState.ballArray.forEach((ball) => {
      // Paddle Collision
      if (checkCollisionCircleRec(paddle, ball)) {
        handlePaddleCollisionSKill(ball, paddle);
      }

      if (isGhostActive > -1 && checkCollisionCircleRec(paddle, ball)) {
        handlePaddleCollisionSKill(ball, paddle);
      }

      // Block Collision
      const collisionDir = getCollisionDirection(ball, block);

      if (collisionDir) {
        // Resolve Collision
        if (collisionDir === "horizontal") {
          ball.dx *= -1;
        } else {
          ball.dy *= -1;
        }

        // Skip blocks that can't be destroyed.
        if (block.type !== BlockType.INDESTRUCTIBLE)
          gameState.blockArray.splice(index, 1);
      }

      ball.update();
      console.log(
        "I am here and the nigga above me didn't run because he is a pussy.",
      );
    });
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
  // Draw the Background Bar for the UI
  ctx.save();
  ctx.fillStyle = "#222"; // Dark gray background for status bar
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height * LAYOUT.marginTop);

  // Add a separator line
  ctx.beginPath();
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 2;
  ctx.moveTo(0, ctx.canvas.height * LAYOUT.marginTop);
  ctx.lineTo(ctx.canvas.width, ctx.canvas.height * LAYOUT.marginTop);
  ctx.stroke();

  // Text Settings
  const padding = 20;
  ctx.font = "bold 20px Arial";
  ctx.textBaseline = "middle";
  const barCenterY = (ctx.canvas.height * LAYOUT.marginTop) / 2;

  // -- LEFT: Lives --
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.fillText(`Lives: ${gameState.life}`, padding, barCenterY);

  // -- CENTER: Level / Info -- (Optional)
  ctx.textAlign = "center";
  ctx.fillStyle = "#aaa";
  ctx.fillText("LEVEL 1", ctx.canvas.width / 2, barCenterY);

  // -- RIGHT: Active Statuses --
  // We draw them as small colorful badges
  ctx.textAlign = "right";
  let currentX = ctx.canvas.width - padding;

  gameState.activeStatuses.forEach((status) => {
    const name = StatusNames[status.type] || "Unknown";
    const secondsLeft = Math.ceil(status.duration / 60);

    // Status Text
    ctx.fillStyle = "#00ff88";
    const text = `${name} (${secondsLeft}s)`;
    ctx.fillText(text, currentX, barCenterY);

    // Move X position to the left for the next item
    const textWidth = ctx.measureText(text).width;
    currentX -= textWidth + 20; // 20px spacing between items
  });

  ctx.restore();
}
