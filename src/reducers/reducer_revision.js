import { FETCH_REVISION } from '../actions/index'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_REVISION:
    return {...state, revisionData: action.payload };
  }
  return state;
}
