import axios from "axios"
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";

  import AuthService from "services/auth.service";
  // import apiService from '../services/apiService'; 

  export const register = (name, email, password, password_confirmation) => (dispatch) => {
    return AuthService.register(name, email, password, password_confirmation).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        // const message =
        // (error.response.data &&
        //   error.response &&
        //   error.response.data.message) ||
        //   error.message ||
        //   error.toString();
        const message = error.response.data.errors;

        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };



  // export const login = (email, password) => async (dispatch) => {
  //   try {
  //     const mergedCart = [];
  //     // Retrieve unauthenticated cart from localStorage
  //     const unauthenticatedCart = JSON.parse(localStorage.getItem('unauthenticatedCart')) || [];
  
  //     const userData = await AuthService.login(email, password);
  
  //     // Merge the carts after successful login
  //     if (unauthenticatedCart.length > 0) {
  //       mergedCart = await apiService.mergeCarts(unauthenticatedCart);
  //       // update cart
  //       //localStorage.removeItem('unauthenticatedCart');
  //       //localStorage.setItem('cart', JSON.stringify(updatedIncreaseState))
  //       dispatch({
  //         type: 'ADD_TO_CART',
  //         payload: mergedCart,
  //       });
  //     }
  
  //     dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: {
  //         user: userData,
  //         cart: mergedCart,
  //       },
  //     });
  
  
  //     return Promise.resolve();
  //   } catch (error) {
  //     const message =
  //       (error.response && error.response.data && error.response.data.message) ||
  //       error.message ||
  //       error.toString();
  
  //     dispatch({
  //       type: LOGIN_FAIL,
  //     });
  
  //     dispatch({
  //       type: SET_MESSAGE,
  //       payload: message,
  //     });
  
  //     return Promise.reject();
  //   }
  // };  



// if (unauthenticatedCart.length > 0) {
      // const mergedCart = await apiService.mergeCarts(userData.id, unauthenticatedCart);
// cart: []

  export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
  

//TODO: if items in cart and diff from db, merge
const cart = JSON.parse(localStorage.getItem('cart')) || [];
if (cart.length > 0) {
    axios.post('http://127.0.0.1:8000/api/v1/merge-cart', {cart}, {
	      headers: {
		      'Content-Type': 'multipart/form-data',
		      'Authorization': `Bearer ${data.token}`,
	      },
    });
}

        dispatch({
          type: SET_MESSAGE,
          payload: {type: "success", message: "Login sucessfull"},
        });


        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data.errors ? error.response.data.errors :
		      { dispatchError: error.response.data.message }
    /*      (error.response.data &&
            error.response &&
            error.response.data.message) ||
          error.message ||
          error.toString();
*/

        dispatch({
          type: LOGIN_FAIL,
        });
  
	      console.log("errorzzz", error);

        dispatch({
          type: SET_MESSAGE,
          payload: {type: "error", message},
        });
  
        return Promise.reject();
      }
    );
  };

  
export const logout = () => (dispatch) => {
	//TODO: if logged in, empty cart cos cart is in DB
    localStorage.removeItem("cart");
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };
