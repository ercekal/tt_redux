import _ from 'lodash'
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

const DOMAIN = 'http://0.0.0.0:5003/page/'

class Article extends Component {
  // static propTypes = {
  //   articleFetch: PropTypes.instanceOf(PromiseState).isRequired,
  //   postRevision: PropTypes.func.isRequired,
  //   postRevisionResponse: PropTypes.instanceOf(PromiseState),
  // }
  state = {
    newData: '',
  }
  componentWillMount () {
    this.setState({
      title: this.props.match.params.articleTitle,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.articleFetch.value) {
      const revisions = nextProps.articleFetch.value.revisions
      const lastRevision = _.last(nextProps.articleFetch.value.revisions)
      this.setState({
        revisions: revisions,
        lastRevisionNo: lastRevision,
      })
    axios.get(`${DOMAIN}${this.state.title}/${lastRevision}`)
    .then(res => {
      this.setState({
        lastRevisionData: res.data.data,
      })
    })
    .catch(error => {
      console.log(error)
    })
    }
  }

  handleChange = event => {
    this.setState({newData: event.target.value});
  }

  // _checkResponse () {
  //   const {postRevisionResponse} = this.props
  //   if (postRevisionResponse) {
  //     if (postRevisionResponse.meta.response.status === 200) {
  //       // window.location.reload()
  //       console.log('yolo')
  //     } else {
  //       console.log(postRevisionResponse.meta.response.status)
  //     }
  //   }
  // }

  handleSubmit = event => {
    event.preventDefault();
    // const data = {
    //   page: this.state.newData
    // }
    // axios.post(`${DOMAIN}${this.state.title}`,
    // data)
    // .then(res => {
    //   if (res.data === 'success') {

    //   }
    // })
    // .catch(err => {
    //   console.log(err)
    // })

    this.props.postRevision(this.state.newData)
    // this._checkResponse()
  }

  renderLatest (lastRevision) {
    const {title} = this.state
    axios.get(`${DOMAIN}${title}/${lastRevision}`)
    .then(res => {
      this.setState({
        lastRevision: res.data.data
      })
    })
    .catch(error => {
      console.log(error)
    })

    return (
      <div>
        <div>
          <div className='header'>
            Last revision
          </div>
          <Link to={`/${title}/revisions/${lastRevision}`} className='revision'>{lastRevision}</Link>
        </div>
        <div className='header'>
          Content
        </div>
        <div className='revisionBox'>
          {this.state.lastRevision}
        </div>
      </div>
    )
  }

  renderFirstRevisions () {
    let {revisions} = this.state
    var firstRevisions = revisions.slice(0, -1)

    return firstRevisions.map((revision, i) => {
      return (
        <div key={i}>
          <Link to={`/${this.props.match.params.articleTitle}/revisions/${revision}`}>{revision}</Link>
        </div>
      )
    })
  }

  renderNewInput () {
    return (
      <form>
        <label>
          <div className='header'>
            Make a new revision
          </div>
          <input
            className='input'
            type='text'
            value={this.state.newData}
            onChange={this.handleChange}
            />
        </label>
        <button className='input' onClick={this.handleSubmit}>Submit new revision</button>
      </form>
    )
  }

  render() {
    const { articleFetch } = this.props
    const { articleTitle } = this.props.match.params
    if (articleFetch.pending) {
      return (
        <div>
          Loading...
        </div>
      )
    } else if (articleFetch.rejected) {
      return (
        <div>
          Rejected...
        </div>
      )
    } else if (articleFetch.fulfilled) {
      const lastRevision = _.last(articleFetch.value.revisions)
      return (
        <div>
          <Link to='/'>Home</Link>
          <div className='header'>
            Title
          </div>
          <strong>{articleTitle}</strong>
          {this.renderLatest(lastRevision)}
          <div className='header'>
            Other revisions
          </div>
          <div className='firstRevisions'>
            {this.renderFirstRevisions()}
          </div>
          {this.renderNewInput()}
        </div>
      )
    }
  }
}

export default connect((props) => ({
  articleFetch: `${DOMAIN}${props.match.params.articleTitle}`,
  postRevision: page => ({
    postRevisionResponse: {
      url: `${DOMAIN}${props.match.params.articleTitle}`,
      method: 'POST',
      body: JSON.stringify({ page }),
    }
  })
}))(Article)
