import React from "react";

import Homepage from "./pages/Homepage";
import AddTravel, { PATH_ADD_TRAVEL } from "./pages/AddTravel";
import Travel, { PATH_TRAVEL } from "./pages/Travel";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

const App: React.FC = () => {
  return (
    <Router>
      <Link to="/">
        <Button>Homepage</Button>
      </Link>
      <Link to={PATH_ADD_TRAVEL}>
        <Button>AddTravel</Button>
      </Link>

      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path={`${PATH_ADD_TRAVEL}`} exact component={AddTravel} />
        <Route path={`${PATH_TRAVEL}/:id`} component={Travel} />
      </Switch>
    </Router>
  );
};

export default App;
