import React from 'react'
import PropTypes from 'prop-types'

// CSS
import './Bets.scss'

// Helpers
import { precisionRound } from 'Helpers'

// Components
import { IconDropdown, IconMenuItem } from 'Components/Common'

// Assets
import GreenArrowUp from 'Assets/Icons/green-arrow-up.svg'
import RedArrowDown from 'Assets/Icons/red-arrow-down.svg'
import AtSign from 'Assets/Icons/at-sign.svg'
import Dots from 'Assets/Icons/horizontal-dots.svg'
import Remove from 'Assets/Icons/remove.svg'
import Edit from 'Assets/Icons/edit-pencil.svg'

const roundTwo = precisionRound(2)

class BetsByDay extends React.Component {
  parsePickCol (bet) {
    if (bet.bet_type === 'total') {
      if (bet.pick[0] === 'O') {
        return (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
            <GreenArrowUp width={14} height={14} style={{ marginTop: '-2px' }} />
            <span className='semibold' style={{ marginLeft: '2px' }}>{bet.pick.slice(1)}</span>
          </div>
        )
      }

      return (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
          <RedArrowDown width={14} height={14} />
          <span className='semibold' style={{ marginLeft: '2px' }}>{bet.pick.slice(1)}</span>
        </div>
      )
    }

    const teamLogo = bet.match.away.team_id === bet.team_id ? (
      bet.match.away.image
    ) : bet.match.home.image

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={teamLogo} style={{ width: '24px', height: '24px' }} key={1} />
        <span className='semibold' key={2}>{bet.pick}</span>
      </div>
    )
  }

  calculateWinInUnits (bet) {
    if (bet.odds.slice(0, 1) === '-') {
      return roundTwo(((100 / parseInt(bet.odds.slice(1), 10)) * bet.units))
    }

    return roundTwo(((parseInt(bet.odds.slice(1), 10) / 100) * bet.units))
  }

  renderResult (bet) {
    if (!bet.result) {
      return null
    }

    const net = this.calculateWinInUnits(bet)

    return bet.result === 'win' ? (
      <span style={{ color: 'var(--dark-green)' }}>{`+${net}U`}</span>
    ) : (
      <span style={{ color: 'var(--dark-red)' }}>{`-${bet.units}U`}</span>
    )
  }

  render () {
    const { date, bets } = this.props

    return (
      <div styleName='bets-by-day'>
        <h3 className='semibold' style={{ marginBottom: '30px' }}>{date}</h3>
        <ul>
          {
            bets.map(bet => (
              <li key={bet.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div styleName='bet'>
                  <div styleName='col' style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={bet.match.away.image}
                        style={{
                          width: '24px',
                          height: '24px',
                          marginRight: '5px'
                        }}
                      />

                      <AtSign width={12} height={12} />

                      <img
                        src={bet.match.home.image}
                        style={{
                          width: '24px',
                          height: '24px',
                          marginLeft: '5px'
                        }}
                      />
                    </div>
                  </div>

                  <div styleName='col'>
                    <p className='label small'>Type</p>
                    <p className='semibold' style={{ marginTop: '4px' }}>
                      {bet.bet_type.slice(0, 1).toUpperCase() + bet.bet_type.slice(1)}
                    </p>
                  </div>

                  <div styleName='col'>
                    <p className='label small'>Pick</p>
                    {this.parsePickCol(bet)}
                  </div>

                  <div styleName='col'>
                    <p className='label small'>Odds</p>
                    <p className='semibold' style={{ marginTop: '4px' }}>{bet.odds}</p>
                  </div>

                  <div styleName='col'>
                    <p className='label small'>Risk</p>
                    <p className='semibold' style={{ marginTop: '4px' }}>{bet.units}U</p>
                  </div>

                  <div styleName='col'>
                    <p className='label small'>To Win</p>
                    <p className='semibold' style={{ marginTop: '4px' }}>
                      {this.calculateWinInUnits(bet)}U
                    </p>
                  </div>

                  <div styleName='col' style={{ display: 'flex', alignItems: 'center' }}>
                    <p className='semibold'>{this.renderResult(bet)}</p>
                  </div>
                </div>

                <IconDropdown
                  icon={
                    <Dots
                      width={14}
                      height={14}
                      style={{
                        transform: 'rotate(90deg)',
                        marginTop: '6px'
                      }}
                    />
                  }
                  listStyle={{ width: '200px' }}
                  onClick={() => console.log('Hello')}
                  wrapperStyle={{ marginLeft: '5px' }}
                  horizontalReverse
                >
                  <IconMenuItem icon={<Edit width={14} height={14} />}>
                    Edit
                  </IconMenuItem>

                  <IconMenuItem icon={<Remove width={16} height={16} />}>
                    Delete
                  </IconMenuItem>
                </IconDropdown>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

BetsByDay.propTypes = {
  bets: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired
}

export default BetsByDay