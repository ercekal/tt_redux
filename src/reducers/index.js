import { combineReducers } from 'redux';
import TitlesReducer from './reducer_titles';
import RevisionsReducer from './reducer_revisions';
import RevisionReducer from './reducer_revision';


const rootReducer = combineReducers({
  titles: TitlesReducer,
  revisions: RevisionsReducer,
  revisionData: RevisionReducer,
});

export default rootReducer;
