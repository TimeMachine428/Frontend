import React from "react";

 function confirmBox(){
  	var text;
  	if (confirm("Logged in with GitHub!")) {
  		text = "Cool";
  	} else {
  		text = "not cool";
  	}
  }

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>
        	Home
        </h1>
        <button onClick={confirmBox()}>
        	Log in with Github
        </button>
      </div>
    );
  }
}