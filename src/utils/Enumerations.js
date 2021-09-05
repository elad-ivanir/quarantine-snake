export const Direction = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
  UNKNOWN: "unknown",
};

export const InvertDirection = {
  [Direction.LEFT]: Direction.RIGHT,
  [Direction.RIGHT]: Direction.LEFT,
  [Direction.UP]: Direction.DOWN,
  [Direction.DOWN]: Direction.UP,
  [Direction.UNKNOWN]: Direction.UNKNOWN,
};
