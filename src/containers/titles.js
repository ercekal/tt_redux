import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { fetchTitles } from '../actions/index';
import { connect } from 'react-redux'

class Titles extends Component {
  static propTypes = {
    titles: PropTypes.array,
  }

  componentWillMount() {
    this.props.fetchTitles()
  }

  _renderTitles () {
    if (this.props.titles) {
      return this.props.titles.map((title, i) => {
        return (
          <div key={i}>
            <Link to={`/articles/${title}`}>{title}</Link>
          </div>
        )
      })
    }
  }

  render() {
    const { titles } = this.props

    if (titles) {
      return (
        <div className='articles'>
          Articles:
          {this._renderTitles()}
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
  return bindActionCreators({ fetchTitles }, dispatch)
}

function mapStateToProps(state) {
  return {
    titles: state.titles.titles,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Titles);