import React from 'react'
import { Link } from 'react-router-dom'

// Components
import LoginForm from './LoginForm'

const styles = {
  wrapperStyle: {
    width: '400px',
    minHeight: '745px',
    margin: '0 auto'
  },
  headerStyles: {
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    margin: '48px 0'
  },
  linkStyles: {
    color: '#fff',
    margin: '48px auto 0',
    display: 'block',
    textAlign: 'center'
  }
}

const Login = () => (
  <div style={styles.wrapperStyle}>
    <h1 style={styles.headerStyles}>
      Log in to your account
    </h1>

    <LoginForm />

    <Link to={{ pathname: '/auth/forgot' }} style={styles.linkStyles}>
      Forgot your password?
    </Link>

    <Link to={{ pathname: '/auth/signup' }} style={styles.linkStyles}>
      Sign up for an account
    </Link>
  </div>
)

export default Login