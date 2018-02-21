import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

// Icons
import ModelIcon from 'Assets/Icons/landingPage/blue-model.svg'
import PodiumIcon from 'Assets/Icons/landingPage/blue-podium-trophy.svg'
import SpaceshipIcon from 'Assets/Icons/landingPage/blue-spaceship.svg'

// CSS
import './LandingPage.scss'

const HowTo = () => {
  return (
    <section styleName="how-to">
      <Row center='xs' styleName="col-1000">
        <Col xs={12} style={{ margin: '50px 0 ' }}>
          <p>Giant cool picture #2</p>
        </Col>

        <Col xs={4}>
          <ModelIcon height={80} width={80} />
          <p>Create models</p>
        </Col>

        <Col xs={4}>
          <SpaceshipIcon height={80} width={80} />
          <p>Generate predictions</p>
        </Col>

        <Col xs={4}>
          <PodiumIcon height={80} width={80} />
          <p>Improve your bets</p>
        </Col>
      </Row>
    </section>
  )
}

export default HowTo
