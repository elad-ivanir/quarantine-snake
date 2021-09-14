import { Board } from "../../bl/Board";
import { ObservableGame } from "../../bl/ObservableGame";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../../utils/Constants";

const board = new Board(BOARD_HEIGHT, BOARD_WIDTH);
const gameContext = new ObservableGame(board);

export default gameContext;
