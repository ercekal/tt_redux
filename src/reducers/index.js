import { combineReducers } from 'redux';
import TitlesReducer from './reducer_titles';
import RevisionsReducer from './reducer_revisions';


const rootReducer = combineReducers({
  titles: TitlesReducer,
  revisions: RevisionsReducer,
});

export default rootReducer;
