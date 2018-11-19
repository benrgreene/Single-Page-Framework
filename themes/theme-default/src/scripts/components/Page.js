const React = require('react')

import { connect } from 'react-redux';

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
    var newurl = siteUrl + '?page=' + this.props.postObject.slug;
    window.history.pushState({ path: newurl }, '', newurl)
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