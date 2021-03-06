import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card, Button } from 'Components/Common'

// Icons
import CheckIcon from 'Assets/Icons/green-check.svg'

// CSS
import './SubscriptionPlan.scss'

// Helpers
import { makeFilterSubscriptions } from 'Helpers/Selectors'
import { planFactory } from 'Helpers'

const initialStyle = {
  height: '360px',
  width: '260px',
  position: 'relative',
  margin: '0 20px',
  transition: 'all 200ms ease'
}

class SubscriptionPlan extends React.Component {
  state = {
    style: initialStyle
  }

  selectPlan = () => {
    this.props.select(this.props.plan)
  }

  renderButton () {
    const { subscription, plan, updatingSubscription, creatingSubscription } = this.props
    const buttonStyle = {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translate(-50%, 0)',
      width: '85%'
    }

    if (subscription && subscription.plan.id === plan) {
      return (
        <p
          style={{ ...buttonStyle, bottom: '30px', cursor: 'default' }}
          className="semibold"
        >
          You are currently on this plan
        </p>
      )
    }

    if (planFactory[plan].disabled) {
      return (
        <Button
          style={buttonStyle}
          disabled
          shouldFitContainer
        >
          Currently unavailable
        </Button>
      )
    }

    if (updatingSubscription || creatingSubscription) {
      return (
        <Button style={buttonStyle} shouldFitContainer loading />
      )
    }

    return (
      <Button
        onClick={this.selectPlan}
        style={buttonStyle}
        type="button"
        shouldFitContainer
      >
        Choose this plan
      </Button>
    )
  }

  renderRibbon () {
    const { subscription, plan } = this.props

    if (subscription && subscription.plan.id === plan) {
      return <div styleName="ribbon"><span>SUBSCRIBED</span></div>
    }

    return null
  }

  render () {
    const { plan } = this.props

    return (
      <Card
        style={{
          display: 'inline-block',
          margin: '0'
        }}
        wrapperStyle={{
          ...this.state.style,
          opacity: planFactory[plan].disabled ? '0.8' : '1',
          boxShadow: '0 4px 8px -2px rgba(9, 30, 66, .28), 0 0 1px rgba(9, 30, 66, .3)',
          border: 'none'
        }}
      >
        <div styleName="subscription-plan">
          {this.renderRibbon()}

          <Row center='xs'>
            <Col xs={12}>
              <p
                className="semibold small"
                style={{ color: planFactory[plan].color }}
              >
                {plan.split('-')[0].toUpperCase()}
              </p>
            </Col>

            <Col xs={12}>
              <div styleName="price">
                <span className="semibold" styleName="dollar">$</span>
                <span className="semibold" styleName="amount">{planFactory[plan].price}</span>
                <span className="small" style={{ letterSpacing: '0.5px' }}>/mo</span>
              </div>
            </Col>
          </Row>

          <hr />

          <div styleName="features" center='xs'>
            {
              planFactory[plan].features.map(feature => (
                <div key={feature} style={{ position: 'relative' }}>
                  <CheckIcon
                    height={10}
                    width={10}
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: '5px'
                    }}
                  />
                  <p
                    className="small"
                    style={{ textAlign: 'center', marginBottom: '10px' }}
                  >
                    {feature}
                  </p>
                </div>
              ))
            }
          </div>

          <Row>
            {this.renderButton()}
          </Row>
        </div>
      </Card>
    )
  }
}

SubscriptionPlan.defaultProps = {
  select: () => null,
  subscription: null,
  creatingSubscription: false,
  updatingSubscription: false
}

SubscriptionPlan.propTypes = {
  plan: PropTypes.oneOf(['single-plan', 'multi-plan']).isRequired,
  select: PropTypes.func,
  subscription: PropTypes.object,
  creatingSubscription: PropTypes.bool,
  updatingSubscription: PropTypes.bool
}

const makeMapStateToProps = () => {
  const getSubscription = makeFilterSubscriptions()
  return ({ routines }) => ({
    subscription: getSubscription(routines).subscription,
    creatingSubscription: routines.isLoading.CREATE_SUBSCRIPTION,
    updatingSubscription: routines.isLoading.UPDATE_SUBSCRIPTION
  })
}

export default connect(
  makeMapStateToProps
)(SubscriptionPlan)
