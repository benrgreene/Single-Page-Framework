const React = require('react')

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapStateToProps = state => ({
  postObject: state.postObject
})

const mapDispatcherToProps = dispatch => {
  return {
    setPageType: (pageType) => dispatch({
      type: 'ARCHIVE_VIEW',
      viewType: pageType,
      postObject: false
    })
  }
}

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class Single extends React.Component {
  constructor (props) {
    super(props)
    // state
    this.state = {
      postObject: this.props.postObject
    }
    // callbacks
    this.backToArchive = this.backToArchive.bind(this)
  }

  backToArchive (event) {
    this.props.setPageType('archive')
  }

  render() {
    return(
      <div className="l-contain">
        <div className="back-button" onClick={this.backToArchive}>Back To Blog</div>
        <article className="post post--single">
          <h1 className="post__title">{this.state.postObject.title}</h1>
        </article>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(Single)