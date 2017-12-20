import axios from 'axios'

export const FETCH_TITLES = 'FETCH_TITLES';
export const FETCH_REVISIONS = 'FETCH_REVISIONS';
export const FETCH_REVISION = 'FETCH_REVISION';
export const ADD_REVISION_SUCCESS = 'ADD_REVISION_SUCCESS';
export const ADD_REVISION_FAILURE = '';

export function fetchTitles() {
  return dispatch => {
    axios.get('http://0.0.0.0:5003/pages')
    .then(res => {
      dispatch({
        type: FETCH_TITLES,
        payload: res.data.titles
      })
    })
  }
}

export function fetchRevisions(title) {
  return dispatch => {
    axios.get(`http://0.0.0.0:5003/page/${title}`)
    .then(res => {
      dispatch({
        type: FETCH_REVISIONS,
        payload: res.data.revisions
      })
    })
  }
}

export function fetchRevision(title, revision) {
  return dispatch => {
    axios.get(`http://0.0.0.0:5003/page/${title}/${revision}`)
    .then(res => {
      dispatch({
        type: FETCH_REVISION,
        payload: res.data.data
      })
    })
  }
}

export function addRevision(title, data) {
  return dispatch => {
    axios.post(`http://0.0.0.0:5003/page/${title}`,
    data)
    .then(res => {
      dispatch({
        type: ADD_REVISION_SUCCESS,
        payload: res.data
      })
      axios.get(`http://0.0.0.0:5003/page/${title}`)
      .then(res => {
        dispatch({
          type: FETCH_REVISIONS,
          payload: res.data.revisions
        })
      })
    })
    .catch(err => {
      dispatch({
        type: ADD_REVISION_FAILURE,
        payload: err
      })
    })
  }
}
