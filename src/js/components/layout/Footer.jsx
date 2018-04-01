import React from "react";
import { Link } from "react-router";


export default class Footer extends React.Component {
  constructor() {
    super();
    this.onCheck= this.onCheck.bind(this);
  }
  onCheck() {
    console.log(this.props.location.pathname);
  }
  render() {

    const shouldRender = !(this.props.location.pathname === "/termsConditions");
    return (
      <footer>
        <div className="row">
          <div className="col-lg-12">
            {shouldRender && (
              <div>
                <Link to={{pathname: "termsConditions"}} onClick={this.onCheck}>Terms & Conditions</Link>
              </div>
            )}
            <p>Copyright &copy; TimeMachine</p>
          </div>
        </div>
      </footer>
    );
  }
}
