const React = require('react')

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Menu from './Menu'
import Footer from './Footer'

class App extends React.Component {
  constructor (props) {
    super(props)
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
        <section id="js-content" className="site-content"></section>
        <footer className="site-footer">
          <Footer/>
          <div className="site-info">
            <div className="l-contain">
              <div className="site-info__copyright">
                
              </div>
              <div className="site-info__design-by">
                Site design by Ben Greene
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default connect(null, null)(App)