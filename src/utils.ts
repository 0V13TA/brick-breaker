import { Ball } from "./objects/ball";
import { Block } from "./objects/block";
import { Paddle } from "./objects/paddle";
import { Shooter } from "./objects/shooter";
import { UniqueStatusDrop } from "./objects/uniqueStatus";

export function checkCollisionCircleRec(
  rect: Paddle | Shooter | Block,
  circle: Ball | UniqueStatusDrop,
): boolean {
  let collision = false;
  let recCenterX = rect.x + rect.width / 2,
    recCenterY = rect.y + rect.height / 2;
  let dx = Math.abs(circle.x - recCenterX),
    dy = Math.abs(circle.y - recCenterY);

  if (dx > rect.width / 2 + circle.radius) return false;
  if (dy > rect.height / 2 + circle.radius) return false;

  if (dx <= rect.width / 2) return true;
  if (dy <= rect.height / 2) return true;

  const cornerDistanceSquare =
    Math.pow(dx - rect.width / 2, 2) + Math.pow(dy - rect.height / 2, 2);

  collision = cornerDistanceSquare <= circle.radius * circle.radius;
  return collision;
}
