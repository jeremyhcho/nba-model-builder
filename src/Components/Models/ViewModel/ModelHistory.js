import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'
import moment from 'moment'

// Components
import { Checkbox, QuzeLink } from 'Components/Common'

// Icons
import BanIcon from 'Assets/Icons/ban.svg'

// CSS
import './ViewModel.scss'

// Helpers
import { precisionRound } from 'Helpers'

const roundTwo = precisionRound(2)

class ModelHistory extends React.Component {
  state = {
    checkAll: true,
    checkScheduled: false,
    checkClosed: false
  }

  getResult (result) {
    if (!result) return '-'

    return result[0].toUpperCase() + result.substr(1)
  }

  getPick (prediction) {
    if (!prediction.pick) return '-'

    const teamPick = prediction.match[prediction.pick.match_type].short_name

    let vegasSpread = prediction.pick.vegas_spread
    if (vegasSpread > 0) vegasSpread = `+${vegasSpread}`
    if (vegasSpread === 0) vegasSpread = 'PICK'

    return `${teamPick} ${vegasSpread}`
  }

  handleChange = (field) => {
    return () => {
      const defaultState = {
        checkAll: false,
        checkScheduled: false,
        checkClosed: false
      }

      if (this.state[field]) {
        return null
      }

      return this.setState({
        ...defaultState,
        [field]: !this.state[field]
      })
    }
  }

  filteredPredictions () {
    const { checkScheduled, checkClosed } = this.state
    const { predictions } = this.props.model

    if (checkClosed) {
      return predictions.filter(prediction => prediction.match.status === 'CLOSED')
    }

    if (checkScheduled) {
      return predictions.filter(
        prediction => prediction.match.status === 'SCHEDULED' || prediction.match.status === 'INPROGRESS')
    }

    return predictions
  }

  parsePredictionText (prediction) {
    const awayPoints = prediction.away_points
    const homePoints = prediction.home_points
    const winner = awayPoints > homePoints ? 'away' : 'home'
    const winningSpread = awayPoints > homePoints ? (
      homePoints - awayPoints
    ) : awayPoints - homePoints

    return `${prediction.match[`${winner}`].short_name} ${roundTwo(winningSpread)}`
  }

  render () {
    const filteredPredictions = this.filteredPredictions()

    return (
      <div styleName="model-history">
        <p
          className="semibold"
          styleName="view-label"
        >
          History
        </p>

        <div styleName="view-predictions">
          <Row center='xs' middle='xs' styleName="prediction-label">
            <Col xs={4}>
              <Checkbox
                style={{ margin: '5px 10px 5px 0' }}
                onChange={this.handleChange('checkAll')}
                checked={this.state.checkAll}
              >
                All
              </Checkbox>

              <Checkbox
                style={{ margin: '5px 10px 5px 0' }}
                onChange={this.handleChange('checkScheduled')}
                checked={this.state.checkScheduled}
              >
                Scheduled
              </Checkbox>

              <Checkbox
                style={{ margin: '5px 10px 5px 0' }}
                onChange={this.handleChange('checkClosed')}
                checked={this.state.checkClosed}
              >
                Closed
              </Checkbox>
            </Col>

            <Col xs={2}>
              <p className="label">Prediction</p>
            </Col>

            <Col xs={2}>
              <p className="label">Actual</p>
            </Col>

            <Col xs={2}>
              <p className="label">Pick</p>
            </Col>

            <Col xs={2}>
              <p className="label">Result</p>
            </Col>
          </Row>

          <div styleName="predictions">
            {
              filteredPredictions.length ? (
                this.filteredPredictions().map(prediction => (
                  <QuzeLink to={{ pathname: `/games/${prediction.match.id}/models` }} key={prediction.id}>
                    <Row center='xs' styleName="prediction-values">
                      <Col xs={4}>
                        <Row around='xs'>
                          <p className="label">
                            {moment(new Date(prediction.match.date)).format('MM/DD/YY')}
                          </p>
                          <p className="semibold">
                            {prediction.match.away.short_name} @ {prediction.match.home.short_name}
                          </p>
                        </Row>
                      </Col>

                      <Col xs={2}>
                        <p className="semibold">
                          {this.parsePredictionText(prediction)}
                        </p>
                      </Col>

                      <Col xs={2}>
                        <p className="semibold">
                          {prediction.match.away.points} - {prediction.match.home.points}
                        </p>
                      </Col>

                      <Col xs={2}>
                        <p className="semibold">
                          {this.getPick(prediction)}
                        </p>
                      </Col>

                      <Col xs={2}>
                        <p className="semibold">
                          {this.getResult(prediction.result)}
                        </p>
                      </Col>
                    </Row>
                  </QuzeLink>
                ))
              ) : (
                <div styleName="missing-predictions">
                  <BanIcon />
                  <h4 className="semibold label">
                    No predictions were found for this model
                  </h4>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

ModelHistory.propTypes = {
  model: PropTypes.object.isRequired
}

export default ModelHistory
