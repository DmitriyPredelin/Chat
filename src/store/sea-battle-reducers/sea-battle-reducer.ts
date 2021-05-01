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
  myMatrix: defaultMatrix(10),
  enemyMatrix: defaultMatrix(10),
  isInit: false,
};

const seeBattleReducer = (state = defaultStore, action: any) => {
  let newMatrix: ICell[][];
  //console.log(action.type);
  switch (action.type) {
    case INIT_MATRIX:
      console.log("INIT_MATRIX");
      if (action.affil === 1) {
        newMatrix = state.myMatrix;
      } else {
        newMatrix = state.enemyMatrix;
      }

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          newMatrix[i][j] = {
            id: i.toString() + "_" + j.toString(),
            row: i + 1,
            col: j + 1,
            affil: action.affil,
            type: CellType.empty,
          };
        }
      }

      return { ...state, matrix: newMatrix, isInit: true };

    case SET_CELL_CLICK:
      if (action.affil === 1) {
        newMatrix = state.myMatrix;
      } else {
        newMatrix = state.enemyMatrix;
      }

      let cell: ICell = {
        id: "",
        row: 0,
        col: 0,
        affil: 0,
        type: CellType.empty,
      };

      newMatrix.forEach((row, i) => {
        row.forEach((cell: ICell, j: number) => {
          if (cell.row === action.cell.row && cell.col === action.cell.col) {
            //console.log(newMatrix[i][j]);
            
            cell = newMatrix[i][j];
          }
        });
      });

      console.log(cell);
      if (cell) {
        switch (action.cell.type) {
          case CellType.empty:
            cell.type = CellType.ship;
            break;
        }
      }

      //console.log(action.affil);
      /*newMatrix.forEach((row) => {
        let cell = row.find((cell: ICell) => {
          return cell.row === action.cell.row && cell.col === action.cell.col;
        });

        if (cell) {
          switch (action.cell.type) {
            case CellType.empty:
              cell.type = CellType.ship;
              break;
            
          }
        }
      });*/

      return { ...state, matrix: [...newMatrix] };

    case RESET_MATRIX:
      if (action.affil === 1) {
        return { ...state, myMatrix: defaultMatrix(10) };
      } else {
        return { ...state, enemyMatrix: defaultMatrix(10) };
      }
  }

  return { ...state };
};

export const initMatrixAC = (affil: number) => {
  return {
    type: INIT_MATRIX,
    affil: affil,
  };
};

export const setCellClickAC = (cell: ICell, affil: number) => {
  return {
    type: SET_CELL_CLICK,
    cell: cell,
    affil: affil,
  };
};

export const resetMatrixAC = (affil: number) => {
  return {
    type: RESET_MATRIX,
    affil: affil,
  };
};

export default seeBattleReducer;
