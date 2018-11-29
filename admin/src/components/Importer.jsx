const React = require('react')

import { getBaseURL } from '../helpers/info'
import { postFetch, tieMediaToPost } from '../helpers/fetches'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapStateToProps = state => ({
  token: state.authToken
})

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class Importer extends React.Component {
  constructor (props) {
    super(props)
    // refs
    this.fileRef
    // callbacks
    this.uploadImport = this.uploadImport.bind(this)
  }

  uploadImport (event) {
    let self     = this
    let formData = new FormData()
    formData.append('file', this.fileRef.files[0])
    formData.append('token', this.props.token)
    fetch(getBaseURL() + 'api/post/importFile', {
      'method': 'POST',
      'body': formData
    })
    .then((blob) => {
      return blob.json()  
    })
    .then((data) => {
      console.log(data)
    })
  }

  render () {
    return (
      <div className="main-content">
        <p>Select a file to import:</p>
        <input type="file" 
               accept="json"
               ref={(input) => this.fileRef = input}
               onChange={(event) => {console.log(this.fileRef.files[0])}} />
        <button onClick={this.uploadImport}>Submit Post</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Importer)