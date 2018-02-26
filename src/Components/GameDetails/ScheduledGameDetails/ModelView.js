import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Link } from 'react-router-dom'

// Components
import {
  ScheduledModelSelector,
  ModelDetails,
  Predictions,
  // TotalPrediction,
  SpreadPrediction
} from 'Components/GameDetails/Blocks'

// Icons
import NoModelsIcon from 'Assets/Icons/missing-content.svg'

// Actions
import { fetchNBAPredictions } from 'Actions'

class ModelView extends React.Component {
  componentDidMount () {
    this.props.fetchNBAPredictions(this.props.summary.id)
  }

  render () {
    const { fetchingPredictions, predictions } = this.props

    if (fetchingPredictions || !predictions) {
      // View when fetching models .. loader
      return <div />
    }

    if (!predictions.length) {
      // View when user has no models .. link to models route
      return (
        <div style={{ position: 'relative', height: '100%' }}>
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              textAlign: 'center',
              transform: 'translateX(-50%)'
            }}
          >
            <div style={{ opacity: '0.2' }}>
              <NoModelsIcon height={256} width={256} />

              <h1 className="bold" style={{ marginTop: '15px' }}>
                {
                  this.props.summary.status === 'INPROGRESS' ? (
                    'No predictions were made for this game'
                  ) : (
                    "Oops, you haven't created any models."
                  )
                }
              </h1>
            </div>

            {
              this.props.summary.status === 'SCHEDULED' &&
              <p className="semibold label" style={{ marginTop: '5px' }}>
                Click <Link to='/models' className="link">here</Link> to create your first model.
              </p>
            }
          </div>
        </div>
      )
    }

    return (
      <div style={{ maxWidth: '1300px', width: '100%' }}>
        <Row>
          <Col xs={12}>
            <ScheduledModelSelector />
          </Col>

          <div>
            <ModelDetails />
          </div>
        </Row>

        <Row style={{ maxWidth: '801px' }}>
          <Col xs={12}>
            <Predictions />
          </Col>

          {/* <Col xs={5}>
            <TotalPrediction />
          </Col> */}
        </Row>

        <Row style={{ maxWidth: '801px' }}>
          <Col xs={12}>
            <SpreadPrediction />
          </Col>
        </Row>
      </div>
    )
  }
}

ModelView.defaultProps = {
  predictions: null,
  summary: {},
  fetchingPredictions: false
}

ModelView.propTypes = {
  summary: PropTypes.object,
  predictions: PropTypes.array,
  fetchNBAPredictions: PropTypes.func.isRequired,
  fetchingPredictions: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  predictions: routines.nba.predictions,
  fetchingPredictions: routines.isLoading.FETCH_NBA_PREDICTIONS,
  summary: routines.nba.summary
})

const mapDispatchToProps = {
  fetchNBAPredictions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelView)
