import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import Models from 'Components/Models'
import CreateModel from 'Components/Models/CreateModel'
import EditModel from './EditModel'

const ModelsRoute = () => (
  <Switch>
    <Route exact path='/models' component={Models} />
    <Route exact path='/models/create' component={CreateModel} />
    <Route exact path='/models/create/:id' component={EditModel} />
  </Switch>
)

export default ModelsRoute
