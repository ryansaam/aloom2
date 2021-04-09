import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import CrossRoads from "./components/CrossRoads"
import AltCompany from "./components/AltCompany"
import AltProduct from "./components/AltProduct"
import AloomLoop from "./components/AloomLoop"
import {
  trackVisitedSite
} from "./components/mixpanelAPI"

function App() {
  useEffect(() => {
    trackVisitedSite()
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/cross-roads">
          <CrossRoads />
        </Route>
        <Route path="/company">
          <AltCompany />
        </Route>
        <Route path="/product">
          <AltProduct />
        </Route>
        <Route path="/">
          <AloomLoop />
        </Route>
      </Switch>
    </Router>
  )
}




export default App
