import React from "react";


export default class Home extends React.Component {

    confirmBox(event) {
        alert("Logged in with GitHub!")
    }
    constructor(props) {
        super(props);

        this.confirmBox = this.confirmBox.bind(this);
    }
  render() {
    return (
      <div>
        <h1>
        	Home
        </h1>
        <button onClick={this.confirmBox}>
        	Log in with Github
        </button>
      </div>
    );
  }
}