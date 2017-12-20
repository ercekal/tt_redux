import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { fetchRevision } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

class Revision extends Component {
  // static propTypes = {
  //   revisionFetch: PropTypes.instanceOf(PromiseState).isRequired,
  // }

  _renderRevision () {
    const {title, revisionNo} = this.state
    return (
      <div>
        <div className='title'>
          Title =>  <Link to={`/articles/${title}`}>{title}</Link>
        </div>
        <div className='revisionNo'>
          Revision no =>  {revisionNo}
        </div>
        <br/>
        <div className='revisionBox'>
          {this.props.revisionData}
        </div>
      </div>
    )
  }

  componentWillMount() {
    const {articleTitle, revisionNo} =this.props.match.params
    this.setState({
      title: articleTitle,
      revisionNo: revisionNo,
    })
    this.props.fetchRevision(articleTitle, revisionNo)
  }

  render() {
    if (this.props.revisionData) {
      return this._renderRevision()
    }
    return (
      <div>
        Loading...
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRevision }, dispatch)
}

function mapStateToProps(state) {
  return {
    revisionData: state.revisionData.revisionData,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Revision);