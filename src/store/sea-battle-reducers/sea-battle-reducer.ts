import { CellType, ICell, IShot } from "../../common/interface";
import {
  defaultMatrix,
  getSearchCell,
  getSearchCellForId,
} from "./sea-battle-helper";

export const INIT_MATRIX = "INIT_MATRIX";
export const SET_CELL_CLICK = "SET_CELL_CLICK";
export const SET_CELL_DBL_CLICK = "SET_CELL_DBL_CLICK";
export const RESET_MATRIX = "RESET_MATRIX";
export const MATRIX_SIZE = 10;
export const SEND_SHOT = "SEND_SHOT";

const defaultStore = {
  myMatrix: defaultMatrix(MATRIX_SIZE),
  enemyMatrix: defaultMatrix(MATRIX_SIZE),
  isInit: false,
};

const seaBattleReducer = (state = defaultStore, action: any) => {
  let newMatrix: ICell[][] =
    action.affil === 1 ? state.myMatrix : state.enemyMatrix;

  switch (action.type) {
    case INIT_MATRIX:
      console.log("INIT_MATRIX");

      for (let i = 0; i < MATRIX_SIZE; i++) {
        for (let j = 0; j < MATRIX_SIZE; j++) {
          newMatrix[i][j] = {
            id: i.toString() + "_" + j.toString(),
            row: i + 1,
            col: j + 1,
            affil: action.affil,
            type: CellType.empty,
          };
        }
      }
      if (action.affil === 1) {
        return { ...state, myMatrix: [...newMatrix], isInit: true };
      } else {
        return { ...state, enemyMatrix: [...newMatrix], isInit: true };
      }

    case SET_CELL_CLICK:
      let { cell, clickedRow, clickedCol } = getSearchCell(
        newMatrix,
        action.cell
      );
      if (action.cell.affil === 1) {
        if (cell.id !== "") {
          if ( action.cell.type === CellType.empty || (action.cell.type === CellType.near && action.down) ) {
            cell.type = CellType.ship;
            for (let i = clickedRow - 1; i <= clickedRow + 1; i++) {
              for (let j = clickedCol - 1; j <= clickedCol + 1; j++) {
                if (i >= MATRIX_SIZE || i < 0 || j >= MATRIX_SIZE || j < 0) {
                  continue;
                }
                if (i === clickedRow && j === clickedCol) {
                  continue;
                }

                if (newMatrix[i][j].type !== CellType.ship) {
                  newMatrix[i][j].type = CellType.near;
                }
              }
            }
          }
        }
      } else {
        if (cell.id !== "") {
          switch (action.cell.type) {
            case CellType.empty:
              cell.type = CellType.ship;
              break;
          }
        }
  
        //newMatrix[clickedRow][clickedCol] = cell;
      }

      // newMatrix[clickedRow][clickedCol] = cell;

      return { ...state, matrix: [...newMatrix] };

    case SET_CELL_DBL_CLICK:
      let obj = getSearchCell(newMatrix, action.cell);
      let dblCell = obj.cell;
      let dblClickedRow = obj.clickedRow;
      let dblClickedCol = obj.clickedCol;

      if (dblCell.id !== "") {
        dblCell.type = CellType.empty;
      }

      newMatrix[dblClickedRow][dblClickedCol] = dblCell;

      return { ...state, matrix: [...newMatrix] };

    case RESET_MATRIX:
      if (action.affil === 1) {
        return { ...state, myMatrix: defaultMatrix(MATRIX_SIZE) };
      } else {
        return { ...state, enemyMatrix: defaultMatrix(MATRIX_SIZE) };
      }

    case SEND_SHOT:
      newMatrix = state.myMatrix; //стреляют всегда в меня

      let { shotCell, shootingRow, shootingCol } = getSearchCellForId(
        newMatrix,
        action.shot.cellId
      );
      
      switch (shotCell.type) {
        case CellType.empty : shotCell.type = CellType.miss; break;
        case CellType.ship : shotCell.type = CellType.shot; break;
        case CellType.near : shotCell.type = CellType.miss; break;
        default : {}
      }
      /*if (shotCell.type === CellType.empty) {
        shotCell.type = CellType.miss;
      }
      if (shotCell.type === CellType.ship) {
        shotCell.type = CellType.shot;
      }*/

      newMatrix[shootingRow][shootingCol] = shotCell;

      return { ...state, myMatrix: [...newMatrix] };
  }

  return { ...state };
};

export const initMatrixAC = (affil: number) => {
  return {
    type: INIT_MATRIX,
    affil: affil,
  };
};

export const setCellClickAC = (cell: ICell, affil: number, down : boolean) => {
  return {
    type: SET_CELL_CLICK,
    cell: cell,
    affil: affil,
    down : down
  };
};

export const setDblCellClickAC = (cell: ICell, affil: number) => {
  return {
    type: SET_CELL_DBL_CLICK,
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

export const sendShotAC = (shot: IShot) => {
  return {
    type: SEND_SHOT,
    shot: shot,
  };
};

export default seaBattleReducer;
