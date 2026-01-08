import { Paddle } from "./objects/paddle";
import "./style.css";
import { GameScreen, type GameState } from "./types";
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
  gameStatus: [],
  blockArray: [],
  shooterArray: [],
  uniqueDropArray: [],

  volume: {
    music: 100,
    general: 100,
    effects: 100,
  },
};

const paddle = new Paddle(gameState);

function animate() {
  requestAnimationFrame(animate);
  paddle.update();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
}

animate();

addEventListener("keydown", (e) => paddle.move(e));
