export const getMatrix = (affil: number) => (state: any) => {
  if (affil === 1) {
    return state.seeBattle.myMatrix;
  } else {
    return state.seeBattle.enemyMatrix;
  }
};

export const getMatrixInit = (state: any) => {
  return state.seeBattle.isInit;
};

/*export const getShotCell = (state: any) => {
  return state.seeBattle.isInit;
};*/
