import React from 'react'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Route } from 'react-router'

// Global CSS
import './Assets/Stylesheets/Main.scss'

// Layouts
import MainLayout from 'Layouts/Main'
import AuthLayout from 'Layouts/Auth'
import LandingPageLayout from 'Layouts/LandingPage'

// Components
import AuthorizedRoute from 'Components/AuthorizedRoute'
import UnauthorizedRoute from 'Components/UnauthorizedRoute'

// Actions
import { fetchUser } from 'Actions'

// const PrimaryLayout = Loadable({
//   loader: () => import('./layouts/Primary'),
//   loading: Loader
// })
//
// const SessionLayout = Loadable({
//   loader: () => import('./layouts/Session'),
//   loading: Loader
// })

class App extends React.Component {
  componentDidMount () {
    this.props.fetchUser()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.authorized && !this.props.authorized) {
      this.props.fetchUser()
    }
  }

  render () {
    return (
      <div className='main'>
        <Switch>
          <Route path='/secret' component={LandingPageLayout} />
          <UnauthorizedRoute path='/auth' component={AuthLayout} />
          <AuthorizedRoute path='/' component={MainLayout} />
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => ({
  authorized: auth.authState.authorized
})

const mapDispatchToProps = {
  fetchUser
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
