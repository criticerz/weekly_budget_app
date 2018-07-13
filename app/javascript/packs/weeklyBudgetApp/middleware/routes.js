import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import WeeklyBudgetApp from '../components/WeeklyBudgetApp.jsx';

const App = (props) => (
  <Router>
    <div>
      <Route exact path='/' component={WeeklyBudgetApp} />
    </div>
  </Router>
)
export default App;