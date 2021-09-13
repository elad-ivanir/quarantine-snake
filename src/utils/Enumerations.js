export const Direction = {
  DOWN: 0,
  RIGHT: Math.PI / 2,
  UP: Math.PI,
  LEFT: (Math.PI * 3) / 2,
};

export const DirectionKey = {
  ArrowUp: Direction.UP,
  ArrowRight: Direction.RIGHT,
  ArrowDown: Direction.DOWN,
  ArrowLeft: Direction.LEFT,
};

export const GameEvents = {
  STOP: "stop",
  STEP: "step",
  SCORE_CHANGED: "score",
  TROPHY_CREATED: "trophy",
};
