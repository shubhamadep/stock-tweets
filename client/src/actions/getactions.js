export const getGridDataPending = () => {
  return {
    type: "GET_GRID_INFO_PENDING",
  }
};

export const getGridDataSuccess = (gridInfo) => {
  return {
    type: "GET_GRID_INFO_SUCCESS",
    crypto_info: gridInfo
  }
};
