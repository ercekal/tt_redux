import { FETCH_TITLES } from '../actions/index'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TITLES:
    return {...state, titles: action.payload };
  }
  return state;
}
