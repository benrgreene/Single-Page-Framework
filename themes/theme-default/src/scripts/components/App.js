const React = require('react')

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Archive from './Archive'
import Footer from './Footer'
import Menu from './Menu'
import Page from './Page'
import Single from './Single'

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapStateToProps = state => ({
  viewType: state.viewType,
  postObject: state.postObject
})

const mapDispatcherToProps = dispatch => {
  return {
    setviewType: (viewType) => dispatch({
      viewType: viewType
    })
  }
}

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewType: this.props.viewType
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.viewType != nextProps.viewType) {
      this.setState({ viewType: nextProps.viewType })
    }
  }

  render() {
    return(
      <div className="app-body">
        <header className="site-header">
          <div className="site-header__content l-contain">
            <div className="site-title">
              <a href="">Title</a>
            </div>
            <Menu/>
          </div>
        </header>
        <section id="js-content" className="site-content">
          {'archive' == this.state.viewType && 
            <Archive/>
          }
          {'single' == this.state.viewType && 
            <Single/>
          }
          {'page' == this.state.viewType && 
            <Page/>
          }
        </section>
        <Footer/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(App)