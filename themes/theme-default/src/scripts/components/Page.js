const React = require('react')

import { connect } from 'react-redux';
import { setWindowTitle } from '../helpers.js'

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapStateToProps = state => ({
  postObject: state.postObject
})

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class Page extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      postObject: this.props.postObject
    }
    setWindowTitle(this.props.postObject)
  }

  render () {
    return (
      <div className="l-contain">
        <article className="page">
          <h1 className="page__title">{this.state.postObject.title}</h1>
          <div className="page__info">
            <div className="page__author">Written By: {this.state.postObject.author}</div>
          </div>
          <div className="page__content"
               dangerouslySetInnerHTML={{ __html: this.state.postObject.content}}></div>
        </article>
      </div>
    )
  }
}
export default connect(mapStateToProps, null)(Page)