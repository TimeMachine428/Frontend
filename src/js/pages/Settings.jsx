import React from "react";

export default class Settings extends React.Component {
  login = this.props.location.state.login;

  render() {
    return (
      <h1>Settings</h1>
    );
  }
}
