import {
  FETCH_REVISIONS,
  ADD_REVISION_SUCCESS,
  ADD_REVISION_FAILURE
} from '../actions/index'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_REVISIONS:
    return {...state, revisions: action.payload };
    case ADD_REVISION_SUCCESS:
    return {...state, revisionStatus: action.payload};
    case ADD_REVISION_FAILURE:
    return {...state, revisionStatus: action.payload};
  }
  return state;
}
