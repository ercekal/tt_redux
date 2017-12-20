import _ from 'lodash'
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchRevisions, addRevision } from '../actions/index';
import { bindActionCreators } from 'redux';

class Article extends Component {
  // static propTypes = {
  //   articleFetch: PropTypes.instanceOf(PromiseState).isRequired,
  //   postRevision: PropTypes.func.isRequired,
  //   postRevisionResponse: PropTypes.instanceOf(PromiseState),
  // }
  state = {
    newData: '',
  }
  componentWillMount() {
    this.setState({
      title: this.props.match.params.articleTitle
    })
    this.props.fetchRevisions(this.props.match.params.articleTitle)
  }

  componentDidMount () {
    console.log(this.props.revisions)
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

  // renderLatest (lastRevision) {
  //   const {title} = this.state
  //   axios.get(`${DOMAIN}${title}/${lastRevision}`)
  //   .then(res => {
  //     this.setState({
  //       lastRevision: res.data.data
  //     })
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })

  //   return (
  //     <div>
  //       <div>
  //         <div className='header'>
  //           Last revision
  //         </div>
  //         <Link to={`/${title}/revisions/${lastRevision}`} className='revision'>{lastRevision}</Link>
  //       </div>
  //       <div className='header'>
  //         Content
  //       </div>
  //       <div className='revisionBox'>
  //         {this.state.lastRevision}
  //       </div>
  //     </div>
  //   )
  // }

  renderFirstRevisions () {
    let {revisions} = this.props
    var firstRevisions = revisions.slice(0, -1)

    return firstRevisions.map((revision, i) => {
      return (
        <div key={i}>
          <Link to={`/${this.state.title}/revisions/${revision}`}>{revision}</Link>
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
    if (this.props.revisions) {
      return (
        <div>
          <Link to='/'>Home</Link>
          <div className='header'>
            Title
          </div>
          <strong>{this.state.title}</strong>
          {/* {this.renderLatest(lastRevision)} */}
          <div className='header'>
            Other revisions
          </div>
          <div className='firstRevisions'>
            {this.renderFirstRevisions()}
          </div>
          {/* {this.renderNewInput()} */}
        </div>
      )
    }
      return (
        <div>
          Loading...
        </div>
      )

    // } else if (articleFetch.fulfilled) {
    //   const lastRevision = _.last(articleFetch.value.revisions)
    //   return (
    //     <div>
    //       <Link to='/'>Home</Link>
    //       <div className='header'>
    //         Title
    //       </div>
    //       <strong>{articleTitle}</strong>
    //       {this.renderLatest(lastRevision)}
    //       <div className='header'>
    //         Other revisions
    //       </div>
    //       <div className='firstRevisions'>
    //         {this.renderFirstRevisions()}
    //       </div>
    //       {this.renderNewInput()}
    //     </div>
    //   )
    // }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRevisions, addRevision }, dispatch)
}

function mapStateToProps(state) {
  console.log(state.revisions.revisions)
  return {
    revisions: state.revisions.revisions,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);