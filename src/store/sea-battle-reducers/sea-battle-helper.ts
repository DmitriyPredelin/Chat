import { CellType, ICell } from "common/interface";
import { MATRIX_SIZE } from "./sea-battle-reducer";

export function defaultMatrix(size: any, defaultValue = 0) {
  return Array(size)
    .fill(0)
    .map(() => {
      return Array(size).fill(defaultValue);
    });
}

export function getSearchCell(newMatrix: ICell[][], searchCell: ICell) {
  let cell: ICell = {
    id: "",
    row: 0,
    col: 0,
    affil: 0,
    type: CellType.empty,
  };

  let clickedRow = 0;
  let clickedCol = 0;
  for (let i = 0; i < MATRIX_SIZE; i++) {
    for (let j = 0; j < MATRIX_SIZE; j++) {
      if (
        newMatrix[i][j].id === searchCell.id &&
        newMatrix[i][j].affil === searchCell.affil
      ) {
        cell = newMatrix[i][j];
        clickedRow = i;
        clickedCol = j;

        break;
      }
    }
  }

  return { cell, clickedRow, clickedCol };
}

export function getSearchCellForId(newMatrix: ICell[][], cellId: string) {
  let cell: ICell = {
    id: "",
    row: 0,
    col: 0,
    affil: 0,
    type: CellType.empty,
  };

  let shootingRow = 0;
  let shootingCol = 0;
  for (let i = 0; i < MATRIX_SIZE; i++) {
    for (let j = 0; j < MATRIX_SIZE; j++) {
      if (newMatrix[i][j].id === cellId) {
        cell = newMatrix[i][j];
        shootingRow = i;
        shootingCol = j;
        break;
      }
    }
  }

  return { shotCell: cell, shootingRow, shootingCol };
}
