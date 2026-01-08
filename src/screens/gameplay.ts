import { Paddle } from "../objects/paddle";
import { PlayStatus, type GameState } from "../types";

let paddle: Paddle;
let ghost: Paddle | null;

export function init(gameState: GameState) {
  paddle = new Paddle(gameState);
}

export function draw() {}

export function update(gameState: GameState) {
  if (
    !gameState.ghostDrawn &&
    gameState.gameStatus.includes(PlayStatus.GHOST_PADDLE)
  ) {
    ghost = new Paddle(gameState, true);
  }
}
