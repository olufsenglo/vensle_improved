const initialState = {
  inProgress: false,
  completed: false,
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_CHECKOUT':
      return {
        ...state,
        inProgress: true,
      };

    case 'COMPLETE_CHECKOUT':
      return {
        ...state,
        inProgress: false,
        completed: true,
      };

    default:
      return state;
  }
};

export default checkoutReducer;
