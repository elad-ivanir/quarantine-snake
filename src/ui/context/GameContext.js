import { Board } from "../../bl/Board";
import { ObservableGame } from "../../bl/ObservableGame";
import { Snake } from "../../bl/Snake";
import {
  DEFAULT_BOARD_HEIGHT,
  DEFAULT_BOARD_WIDTH,
  DEFAULT_SNAKE_EDGES,
} from "../constants";

const board = new Board(DEFAULT_BOARD_HEIGHT, DEFAULT_BOARD_WIDTH);
const snake = new Snake(DEFAULT_SNAKE_EDGES);
const gameContext = new ObservableGame(board, snake);

export default gameContext;
