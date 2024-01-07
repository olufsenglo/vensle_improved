// reducer.js

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
} from '../types/actionTypes';

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, items: [...state.items, action.payload] };

    case REMOVE_FROM_CART:
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };

    case DECREASE_QUANTITY:
      return {
        ...state,
        items: state.items
          .map(item =>
            item.id === action.payload
              ? { ...item, quantity: Math.max(0, item.quantity - 1) }
              : item
          )
          .filter(item => item.quantity > 0),
      };

    case INCREASE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
