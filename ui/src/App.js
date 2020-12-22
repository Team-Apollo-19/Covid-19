import Country from "./views/Country";
import Federation from "./views/Federation";

// import { FirebaseContext } from "./components/Firebase";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
      
        <Route path="/state/:id">
          <Federation />
          {/* <FirebaseContext.Consumer>
          </FirebaseContext.Consumer> */}
        </Route>
      
        <Route path="/">
          <Country />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
