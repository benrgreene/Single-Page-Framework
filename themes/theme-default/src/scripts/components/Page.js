const React = require('react')

import { connect } from 'react-redux';

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapStateToProps = state => ({
  pageObject: state.pageObject
})

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class Page extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pageObject: this.props.pageObject
    }
  }

  render () {
    <article className="page">

    </article>
  }
}
export default connect(null, null)(Page)