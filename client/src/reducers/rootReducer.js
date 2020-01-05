
const initState = {
  pending: false,
  crypto_info: {},
}

const rootReducer = (state = initState, action) => {
    switch(action.type) {
      case 'GET_GRID_INFO_PENDING':
        return {
          ...state,
          pending: true,
        }

      case 'GET_GRID_INFO_SUCCESS':
        return {
          ...state,
          pending: false,
          crypto_info: action.crypto_info,
        }

      default:
        return state;
    }
}

export default rootReducer
