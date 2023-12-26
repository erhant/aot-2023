type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTacToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTacToeBoard;
  state: TicTacToeState;
  ctr?: 0[];
};

type EmptyBoard = [
  ["  ", "  ", "  "], 
  ["  ", "  ", "  "], 
  ["  ", "  ", "  "]
];

export type NewGame = {
  board: EmptyBoard;
  state: "❌";
};

type ToIndex = {
  top: 0;
  middle: 1;
  bottom: 2;
  left: 0;
  center: 1;
  right: 2;
};

type IsWinning<B extends TicTacToeBoard, C extends TicTacToeChip, CCC = [C, C, C]> = 
  [B[0][0], B[0][1], B[0][2]] extends CCC ? true : // top row
  [B[1][0], B[1][1], B[1][2]] extends CCC ? true : // middle row
  [B[2][0], B[2][1], B[2][2]] extends CCC ? true : // bottom row
  [B[0][0], B[1][0], B[2][0]] extends CCC ? true : // left col
  [B[0][1], B[1][1], B[2][1]] extends CCC ? true : // center col
  [B[0][2], B[1][2], B[2][2]] extends CCC ? true : // right col
  [B[0][0], B[1][1], B[2][2]] extends CCC ? true : // top-left bottom-right diag
  [B[0][2], B[1][1], B[2][0]] extends CCC ? true : // top-right bottom-left diag
  false;

type IsDraw<B extends any[]> = 
  B extends [infer First, ...infer Rest]
  ? First extends TicTacToeEmptyCell
    ? false
    : IsDraw<Rest>
  : true

// check if a Board is winning, otherwise return next state
type NextState<B extends TicTacToeBoard, C extends TicTacToeChip> =
  IsWinning<B, C> extends true 
  ? {
    board: B,
    state: `${C} Won`
  }
  : IsDraw<[...B[0], ...B[1], ...B[2]]> extends true
  ? {
    board: B,
    state: 'Draw'
  }
  : {
    board: B,
    state: {
      "❌": "⭕";
      "⭕": "❌";
    }[C]
  }

export type TicTacToe<T extends TicTacToeGame, P extends TicTacToePositions> = 
  Retrieve<T['board'], P> extends TicTacToeEmptyCell
  ? T['state'] extends TicTacToeChip 
    ? NextState<Put<T['board'], P, T['state']>, T['state']>
    : never // cant play a non-chip state
  : T; // invalid play keeps the board same

type Retrieve<T extends TicTacToeBoard, P extends TicTacToePositions> =
  P extends `${infer L extends TicTacToeYPositions}-${infer R extends TicTacToeXPositions}` 
  ? T[ToIndex[L]][ToIndex[R]]
  : never;

type Put<T extends TicTacToeBoard, P extends TicTacToePositions, V extends TicTacToeCell> =
  // top
  P extends 'top-left' ?      [[V, T[0][1], T[0][2]], T[1], T[2]] : 
  P extends 'top-center' ?    [[T[0][0], V, T[0][2]], T[1], T[2]] : 
  P extends 'top-right' ?     [[T[0][0], T[0][1], V], T[1], T[2]] : 
  // middle
  P extends 'middle-left' ?   [T[0], [V, T[1][1], T[1][2]], T[2]] : 
  P extends 'middle-center' ? [T[0], [T[1][0], V, T[1][2]], T[2]] : 
  P extends 'middle-right' ?  [T[0], [T[1][0], T[1][1], V], T[2]] : 
  // bottom
  P extends 'bottom-left' ?   [T[0], T[1], [V, T[2][1], T[2][2]]] :
  P extends 'bottom-center' ? [T[0], T[1], [T[2][0], V, T[2][2]]] :
  P extends 'bottom-right' ?  [T[0], T[1], [T[2][0], T[2][1], V]] :
  never;
