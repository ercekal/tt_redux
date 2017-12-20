import _ from 'lodash'
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchRevisions, fetchRevision, addRevision } from '../actions/index';
import { bindActionCreators } from 'redux';

class Article extends Component {
  static propTypes = {
    articleFetch: PropTypes.array,
    revisionData: PropTypes.string,
    revisionStatus: PropTypes.string
  }
  state = {
    newData: '',
  }

  componentWillMount() {
    this.setState({
      title: this.props.match.params.articleTitle
    })
    this.props.fetchRevisions(this.props.match.params.articleTitle)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.revisions !== this.props.revisions) {
      this.setState({
        lastRevisionCalled: false
      })
    }
  }

  handleChange = event => {
    this.setState({newData: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    const {title, newData} = this.state
    const data = {
      page: newData
    }
    this.props.addRevision(title, data)
    this.setState({
      newData: '',
    })
  }

  _renderLastRevisionData () {

  }

  renderLatest (lastRevision) {
    const {title} = this.state
    if (!this.state.lastRevisionCalled) {
      this.props.fetchRevision(title, lastRevision)
      this.setState({
        lastRevisionCalled: true,
        lastRevisionData: this.props.revisionData,
      })
    }
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
          {this.props.revisionData}
        </div>
      </div>
    )
  }

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
    const {revisions} = this.props
    if (revisions) {
      return (
        <div>
          <Link to='/'>Home</Link>
          <div className='header'>
            Title
          </div>
          <strong>{this.state.title}</strong>
          {this.renderLatest(_.last(revisions))}
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
    return (
      <div>
        Loading...
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRevisions, fetchRevision, addRevision }, dispatch)
}

function mapStateToProps(state) {
  return {
    revisions: state.revisions.revisions,
    revisionData: state.revisionData.revisionData,
    revisionStatus: state.revisions.revisionStatus
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);