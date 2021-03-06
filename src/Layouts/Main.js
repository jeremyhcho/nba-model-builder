import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Components
import { Button } from 'Components/Common'
import Header from './Header'
import SideNav from './SideNav'
import Pusher from 'Components/Pusher'
import DashboardLayout from './Dashboard'
import GamesLayout from './Games'
import TeamsLayout from './Teams'
import SettingsLayout from './Settings'
import ModelsLayout from './Models'
import AdminLayout from './Admin'
import BetsLayout from './Bets'

// Assets
import Lock from 'Assets/Icons/lock.svg'

// const CalendarContainer = Loadable({
//   loader: () => import('../../containers/Calendar'),
//   loading: Loader
// })

// Actions
import {
  receivePusherNotification,
  resendVerificationEmail,
  logoutUser
} from 'Actions'

const MainLayout = ({
  userId,
  isVerified,
  sendingEmail,
  receivePusherNotification,
  resendVerificationEmail,
  logoutUser
}) => {
  const sendVerificationEmail = () => resendVerificationEmail(userId)

  if (!isVerified) {
    return (
      <main>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            textAlign: 'center'
          }}
        >
          <Lock height={128} width={128} style={{ opacity: '0.2' }} />

          <h1 className='semibold' style={{ marginTop: '45px' }}>
            Uh oh, looks like you haven't verified your email yet.
          </h1>

          <div style={{ width: '200px', margin: '0 auto' }}>
            <Button
              style={{ marginTop: '45px' }}
              onClick={sendVerificationEmail}
              loading={sendingEmail}
              shouldFitContainer
            >
              Resend email verification
            </Button>
          </div>

          <p
            className='small'
            style={{ marginTop: '15px', cursor: 'pointer' }}
            onClick={logoutUser}
          >
            Login to a different user
          </p>
        </div>
      </main>
    )
  }

  return (
    <main style={{ display: 'flex', overflowY: 'hidden' }}>
      <Pusher
        channel={`builder_api_${userId}`}
        event='notification_received'
        onUpdate={receivePusherNotification}
      />

      <SideNav />

      <div
        style={{
          width: '100%',
          height: '100vh',
          minWidth: '964px',
          minHeight: '500px'
        }}
      >
        <Header />

        <div
          style={{
            height: 'calc(100% - 95px)',
            marginTop: '35px'
          }}
        >
          <Switch>
            <Route path='/dashboard' component={DashboardLayout} />
            <Route path='/admin' component={AdminLayout} />
            <Route path='/games' component={GamesLayout} />
            <Route path='/teams' component={TeamsLayout} />
            <Route path='/models' component={ModelsLayout} />
            <Route path='/settings' component={SettingsLayout} />
            <Route path='/bets' component={BetsLayout} />
            <Redirect to='/dashboard' />
          </Switch>
        </div>
      </div>
    </main>
  )
}

MainLayout.defaultProps = {
  userId: 0,
  isVerified: false
}

MainLayout.propTypes = {
  userId: PropTypes.number,
  receivePusherNotification: PropTypes.func.isRequired,
  isVerified: PropTypes.bool.isRequired,
  resendVerificationEmail: PropTypes.func.isRequired,
  sendingEmail: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.authState.user.id,
  isVerified: auth.authState.user.is_verified,
  sendingEmail: auth.signup.sendingEmail
})

const mapDispatchToProps = {
  receivePusherNotification,
  resendVerificationEmail,
  logoutUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout)
