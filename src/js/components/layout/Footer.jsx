import React from "react";
import { Link } from "react-router";


export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="row">
          <div className="col-lg-12">
            <Link to="termsConditions">Terms & Conditions</Link>
            <p>Copyright &copy; TimeMachine</p>
          </div>
        </div>
      </footer>
    );
  }
}
