import axios from "axios";
// Action Constants
const REQ_USER = "REQ_USER";
const LOGIN_USER = "LOGIN_USER"

// Action Creators
export function requestUser() {
  return {
    type: REQ_USER,
    payload: axios.get("/api/me").then(response => response.data)
  };
}

export function loginUser() {
  return  {
    type: LOGIN_USER,
    payload: true
  }
}

// Initial State

const initialState = {
  user: {},
  loggedIn: false
};

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQ_USER + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_USER + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });
      case LOGIN_USER:
      return Object.assign({}, state, { loggedIn: action.payload });
    default:
      return state;
  }
}
