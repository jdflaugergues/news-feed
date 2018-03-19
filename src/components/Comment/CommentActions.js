import {createActions, handleActions} from 'redux-actions';
import moment from 'moment';
const defaultState = {};

export const {addComment, initializeComments} = createActions({
  INITIALIZE_COMMENTS: (id, comments) => ({id, comments}),
  ADD_COMMENT: (id, comment, profile) => ({id, comment, profile})
});


export default handleActions({
  [addComment] (state, {payload: {id, comment, profile}}) {
    state[id].push({profile, comment, createdDate: moment().format()});
    return {
      ...state
    };
  },
  [initializeComments] (state, {payload: {id, comments}}) {
    return {
      ...state,
      [id]: comments || []
    }
  }
}, defaultState);
