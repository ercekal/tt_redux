import axios from 'axios'

export const FETCH_TITLES = 'FETCH_TITLES';
export const FETCH_REVISIONS = 'FETCH_REVISIONS';
export const ADD_REVISION = 'ADD_REVISION';

export function fetchTitles() {
  return dispatch => {
    axios.get('http://0.0.0.0:5003/pages')
    .then(res => {
      console.log(res)
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
    .then((res) => {
      dispatch({
        type: FETCH_REVISIONS,
        payload: res.data
      })
    })
  }
}

export function addRevision(title, data) {
  return dispatch => {
    axios.post(`http://0.0.0.0:5003/page/${title}`,
    data)
    .then((res) => {
      console.log(res)
      dispatch({
        type: ADD_REVISION,
        payload: res.data
      })
    })
  }
}
