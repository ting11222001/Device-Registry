import React from 'react'; 
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"
import DevicesList from "./components/devices-list.component";
import EditDevice from "./components/edit-device.component";
import CreateDevice from "./components/create-device.component";
import CreateAccount from "./components/create-account.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={DevicesList} />
        <Route path="/edit/:id" component={EditDevice}/>
        <Route path="/create" component={CreateDevice}/>
        <Route path="/account" component={CreateAccount}/>
      </div>
    </Router>
  );
}

export default App;
