import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

// CSS
import './Signup.scss'

// Components
import {
  Button,
  FieldText,
  Spinner
} from 'Components/Atlaskit'

// Redux-form & validators
import { presence, minChar, email, equality } from 'Helpers/Validators'

const minChar6 = minChar(6)
const equalityPassword = equality('Password')

// Actions
import { createUser } from 'Actions'

class SignupForm extends Component {
  submit = ({ Email, Password }) => {
    this.props.createUser({
      email: Email,
      password: Password
    })
  }

  renderInnerButton () {
    if (this.props.creatingUser) {
      return <Spinner invertColor size='small' style={{ paddingTop: '8px' }} />
    }

    return 'Create account'
  }

  renderError () {
    return (
      <div styleName='error-dialog'>
        <p>{this.props.signUpError}</p>
        <p>Need help&nbsp;
          <Link className='link' to={{ pathname: '/auth/forgot' }}>logging in?</Link>
        </p>
      </div>
    )
  }

  render () {
    return (
      <div styleName="signup-container">
        {this.props.signUpError && this.renderError()}
        <form onSubmit={this.props.handleSubmit(this.submit)}>
          <Field
            name="Email"
            component={FieldText}
            label="Email"
            type="email"
            isLabelHidden
            shouldFitContainer
            autoComplete='off'
            placeholder="Enter email"
            validate={[presence, email]}
          />
          <Field
            name="Password"
            component={FieldText}
            label="Password"
            type="password"
            isLabelHidden
            shouldFitContainer
            autoComplete='off'
            placeholder="Create password"
            validate={[presence, minChar6]}
          />
          <Field
            name="Password confirmation"
            component={FieldText}
            label="Confirm password"
            type="password"
            isLabelHidden
            shouldFitContainer
            autoComplete='off'
            placeholder="Confirm password"
            validate={[presence, equalityPassword]}
          />
          <div>
            <Button
              shouldFitContainer
              appearance="primary"
              type="submit"
            >
              {this.renderInnerButton()}
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  creatingUser: PropTypes.bool.isRequired,
  signUpError: PropTypes.string.isRequired
}

const mapStateToProps = ({ auth }) => ({
  creatingUser: auth.signup.creatingUser,
  signUpError: auth.signup.error
})

const mapDispatchToProps = {
  createUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'signup'
})(SignupForm))
