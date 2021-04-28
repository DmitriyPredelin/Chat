import { CellType, IUser, ICell } from "../../common/interface";

export const INIT_MATRIX = "INIT_MATRIX";
export const SET_CELL_CLICK = "SET_CELL_CLICK";
export const RESET_MATRIX = "RESET_MATRIX";

function defaultMatrix(size: any, defaultValue = 0) {
  return Array(size)
    .fill(0)
    .map(() => {
      return Array(size).fill(defaultValue);
    });
}

const defaultStore = {
  matrix: defaultMatrix(10),
  isInit: false,
};

const seeBattleReducer = (state = defaultStore, action: any) => {
  let newMatrix: ICell[][];
  //console.log(action.type);
  switch (action.type) {
    case INIT_MATRIX:
        console.log("INIT_MATRIX");
      newMatrix = state.matrix;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          newMatrix[i][j] = {
            id: i.toString() + "_" + j.toString(),
            row: i + 1,
            col: j + 1,
            type: CellType.empty,
          };
        }
      }

      return { ...state, matrix: newMatrix, isInit: true };

    case SET_CELL_CLICK:
      newMatrix = state.matrix;

      newMatrix.forEach((row) => {
        row.forEach((cell: ICell) => {
          if (cell.row === action.row && cell.col === action.col) {
            cell.type = CellType.ship;
          }
        });
      });

      return { ...state, matrix: newMatrix };

    case RESET_MATRIX:
        console.log("RESET_MATRIX");
        
      return { ...state, matrix: defaultMatrix(10) };
  }

  return { ...state };
};



export const initMatrixAC = () => {
    return {type: INIT_MATRIX}
}

export const setCellClickAC = (
  clickType: CellType,
  row: number,
  col: number
) => {
  return {
    type: SET_CELL_CLICK,
    clickType: clickType,
    row: row,
    col: col,
  };
};

export const resetMatrixAC = () => {
  return { type: RESET_MATRIX };
};

export default seeBattleReducer;
