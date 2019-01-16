const React = require('react')
const Dialogr = require('dialogr');

import { connect } from 'react-redux';
import { md5, setWindowTitle, setMetaContent } from '../helpers.js'

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
      postObject: this.props.postObject,
      gravitar: `https://www.gravatar.com/avatar/${md5(this.props.postObject.author)}.jpg?d=identicon`
    }
    this.processShortcodes = this.processShortcodes.bind(this)
    setWindowTitle(this.props.postObject)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state) { return }
    window.scrollTo(0, 0)
    if (this.props.postObject != nextProps.postObject) {
      setWindowTitle(nextProps.postObject)
      this.setState({
        'postObject': nextProps.postObject,
        'gravitar': `https://www.gravatar.com/avatar/${md5(nextProps.postObject.author)}.jpg?d=identicon`
      })
    }
  }

  render () {
    return (
      <div className="l-contain">
        <article className="page">
          <h1 className="page__title">{this.state.postObject.title}</h1>
          <div className="page__author">
            <figure className="page__author-image">
              <img src={this.state.gravitar} alt="author gravitar" />
              <figcaption className="page__author--name">
                Written By: {this.state.postObject.name || this.state.postObject.author}
              </figcaption>
            </figure>
          </div>
          <div className="page__content"
               dangerouslySetInnerHTML={{ __html: this.state.postObject.content}}></div>
        </article>
      </div>
    )
  }
}
export default connect(mapStateToProps, null)(Page)