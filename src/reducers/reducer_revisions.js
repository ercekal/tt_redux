import { ADD_REVISION, FETCH_REVISIONS } from '../actions/index'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_REVISIONS:
    return {...state, revisions: action.payload };
    case ADD_REVISION:
    return {...state, revisions: action.payload.data };
  }
  return state;
}
