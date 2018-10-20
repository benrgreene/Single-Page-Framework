const React = require('react')

import { getBaseURL } from '../helpers/info'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapStateToProps = state => ({
  token: state.authToken,
  postObject: state.currentPost ? state.currentPost : {}
})

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class PostMetaForm extends React.Component {
  constructor (props) {
    super(props)
    // callbacks
    this.getNewPostMeta = this.getNewPostMeta.bind(this)
    this.setMetaTitle   = this.setMetaTitle.bind(this)
    this.setMetaValue   = this.setMetaValue.bind(this)
    this.addBlankMeta   = this.addBlankMeta.bind(this)
    this.state = { 
      meta: []
    }
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.props.postObject.ID != nextProps.postObject.ID) {
      this.getNewPostMeta(nextProps.postObject.ID)
    }
  }

  /**
   * --------------------------------
   *  Setters/changes to meta content
   * --------------------------------
   */
  setMetaValue (event) {
    this.setMetaData(event, 'content')
  }

  setMetaTitle (event) {
    this.setMetaData(event, 'title')
  }

  setMetaData (event, type) {
    let meta  = this.state.meta
    let index = parseInt(event.target.dataset.index, 10)
    meta[index][type] = event.target.value
    this.setState({
      'meta': meta
    })
  }

  addBlankMeta () {
    let meta = this.state.meta
    meta.push({
      'title': '',
      'content': ''
    })
    this.setState({
      'meta': meta
    })
  }

  /**
   * -------------------------
   * Fetch calls to the server
   * -------------------------
   */

  // Get the meta data
  getNewPostMeta (ID) {
    let baseUrl  = getBaseURL()
    let metaUrl  = `${baseUrl}api/get/meta/${ID}`
    fetch(metaUrl)
    .then((blob) => {
      return blob.json()
    })
    .then((response) => {
      this.setState({
        'meta': JSON.parse(response.content)
      })
    })
  }

  // Send the post meta
  sendPostMeta () {
    let baseUrl  = getBaseURL()
    let metaUrl  = `${baseUrl}api/post/postMeta`
    fetch(metaUrl, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        'token': this.props.token,
        'ID': this.props.postObject.ID,
        'meta': this.state.meta
      }),
    })
    .then((blob) => {
      return blob.json()
    })
    .then((response) => {
      console.log(response)
    })
  }

  /**
   * -------------------------
   * Rendering
   * -------------------------
   */
  render() {
    return (
      <div>
        {this.state.meta.map((meta, index) => { return (
          <div className="meta-container" key={'meta' + index}>
            <div className="meta-container__title">
              <label>Title</label>
              <input type="text" name="meta-title" data-index={index} onChange={this.setMetaTitle} value={meta.title || ''} />
            </div>
            <div className="meta-container__value">
              <label>Value</label>
              <input type="text" name="meta-value" data-index={index} onChange={this.setMetaValue} value={meta.content  || ''} />
            </div>
          </div>
        )})}
        <button onClick={this.addBlankMeta}>+ Meta</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, null, null, { withRef: true })(PostMetaForm)