import "./style.css";
import { GameScreen, type GameState } from "./types";
import * as GamePlay from "./screens/gameplay.ts";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d")!;
document.body.append(canvas);

canvas.width = innerWidth * 0.99;
canvas.height = innerHeight * 0.99;

const gameState: GameState = {
  life: 3,
  ctx: ctx,
  bombCount: 0,
  ballSize: 0.2,
  dropSpeed: 0.3,
  ballSpeed: 0.3,
  ghostDrawn: false,
  paddleSpeed: 0.01,
  gameScreen: GameScreen.GAME_PLAY,

  ballArray: [],
  blockArray: [],
  shooterArray: [],
  activeStatuses: [],
  uniqueDropArray: [],

  volume: {
    music: 100,
    general: 100,
    effects: 100,
  },
};

function animate() {
  requestAnimationFrame(animate);

  switch (gameState.gameScreen) {
    case GameScreen.PAUSE_SCREEN:
      break;
    case GameScreen.GAME_PLAY:
      GamePlay.update(gameState);
      break;
    case GameScreen.GAME_OVER:
      break;
    default:
      console.error("Invalid Screen type", gameState.gameScreen);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (gameState.gameScreen) {
    case GameScreen.PAUSE_SCREEN:
      break;
    case GameScreen.GAME_PLAY:
      GamePlay.draw(gameState);
      break;
    case GameScreen.GAME_OVER:
      break;
    default:
      console.error("Invalid Screen type", gameState.gameScreen);
  }
}

animate();

addEventListener("keydown", (e) => paddle.move(e));
