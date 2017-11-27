import axios from "axios";
// Action Constants
const REQ_USER = "REQ_USER";
const LOGIN_USER = "LOGIN_USER";
const POST_CART = "POST_CART";
const GET_CART = "GET_CART";
const DESTROY_CART = "DESTROY_CART";
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Action Creators
export function requestUser() {
  return {
    type: REQ_USER,
    payload: axios.get("/api/me").then(response => response.data)
  };
}

export function destroyCart(){
  return {
    type: DESTROY_CART,
    payload: []
  }
}

export function removeFromCart(id){
  return {
    type: REMOVE_FROM_CART,
    payload: axios
    .delete(`/api/cart/${id}`)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    })
  }
}

// export function destroyCart(){
//   return {
//     type: DESTROY_CART,
//     payload: axios.get("http://localhost:3001/api/paySuccess").then(response => []);
    
//   }
// }


export function loginUser() {
  return {
    type: LOGIN_USER,
    payload: "LOG OUT"
  };
}

export function addToCart(pro000duct) {
  return {
    type: POST_CART,
    payload: axios
      .post("/api/cart", 
        pro000duct
      )
      .then(function(response) {
        console.log( "cart from session" ,response.data)
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      })
  };
}

export function refreshCart() {
  return {
    type: GET_CART,
    payload: axios
      .get("/api/cart")
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      })
  };
}

// Initial State

const initialState = {
  user: {},
  logged: "LOG IN",
  cart: [],
  isLoading: false
};

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case POST_CART + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case POST_CART + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        cart: action.payload
      });

    case REMOVE_FROM_CART + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REMOVE_FROM_CART + "_FULLFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        cart: action.payload
      });

    case LOGIN_USER:
      return Object.assign({}, state, { logged: action.payload });

    case GET_CART + "_PENDING":
      return Object.assign({}, state,
         { isLoading: true });
    case GET_CART + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        cart: action.payload
      });

    //   case DESTROY_CART + "_PENDING":
    //   return Object.assign({}, state)
    // case DESTROY_CART + "_FULFILLED":
    //     return Object.assign({}, state, {cart: action.payload})
  
        case DESTROY_CART:
        console.log(action.payload);
        return Object.assign({}, state, {cart: action.payload})

    case REQ_USER + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_USER + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });
    default:
      return state;
  }
}
