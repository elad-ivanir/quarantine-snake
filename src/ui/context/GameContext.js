import { Board } from "../../bl/Board";
import { ObservableGame } from "../../bl/ObservableGame";
import { Snake } from "../../bl/Snake";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  DEFAULT_SNAKE_EDGES,
} from "../../utils/Constants";

const board = new Board(BOARD_HEIGHT, BOARD_WIDTH);
const snake = new Snake(DEFAULT_SNAKE_EDGES);
const gameContext = new ObservableGame(board, snake);

export default gameContext;
