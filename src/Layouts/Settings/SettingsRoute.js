import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
import Settings from 'Components/Settings'

const SettingsRoute = () => (
  <Switch>
    <Route path='/settings' component={Settings} />
  </Switch>
)

export default SettingsRoute
