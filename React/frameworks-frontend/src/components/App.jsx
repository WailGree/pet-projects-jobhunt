import '../style/App.css';
import Navbar from './Navbar';
import { Redirect, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Redirect exact from="/" to="/home" />
      <Route exact path="/:page?" render={props => <Navbar {...props} />} />
    </div>
  )
}


