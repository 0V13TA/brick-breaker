export type BlockRow = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

// 0 = Empty
// 1 = Normal
// 2 = Drop Status
// 4 = Indestructible
export const level1: BlockRow[] = [
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // Row 1: Wall of Indestructible
  [1, 1, 0, 0, 1, 1, 0, 0, 1, 1], // Row 2: Gaps
  [1, 2, 1, 1, 2, 1, 1, 2, 1, 1], // Row 3: Mixed with drops (2)
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Row 4: Full normal
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0], // Row 5: Pattern
];
