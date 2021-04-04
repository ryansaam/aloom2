import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import CrossRoads from "./components/CrossRoads"
import Company from "./components/Company"
import Product from "./components/Product"
import AloomLoop from "./components/AloomLoop"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/cross-roads">
          <CrossRoads />
        </Route>
        <Route path="/company">
          <Company />
        </Route>
        <Route path="/product">
          <Product />
        </Route>
        <Route path="/">
          <AloomLoop />
        </Route>
      </Switch>
    </Router>
  )
}




export default App
