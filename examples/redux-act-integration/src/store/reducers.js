import { createRequestsReducer } from 'redux-saga-requests';
import { createReducer } from 'redux-act';

import { success, error, abort, fetchPhoto, clearPhoto, fetchPost, clearPost } from './actions';

const increment = number => number + 1;

export const abortCounterReducer = createReducer({
  [abort(fetchPhoto)]: increment,
  [abort(fetchPost)]: increment,
}, 0);

const requestsReducer = createRequestsReducer({
  success,
  error,
  abort,
});

export const photoReducer = requestsReducer({ actionType: fetchPhoto }, createReducer({
  [clearPhoto]: state => ({ ...state, data: null, error: null }),
}));

export const postReducer = requestsReducer(
  {
    actionType: fetchPost,
    getData: (state, action) => ({ ...action.payload.data[0], comments: action.payload.data[1] }),
  },
  createReducer({
    [clearPost]: state => ({ ...state, data: null, error: null }),
  }),
);
