import React from "react";

export default class MyProblems extends React.Component {
    login = this.props.location.state.login;

    render() {
        return <h1>My Problems</h1>;
        <a className = "delete" href="#">Delete</a>
    }
}
