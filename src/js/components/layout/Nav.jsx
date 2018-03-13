import React from "react";
import axios from "axios";
import { IndexLink, Link } from "react-router";
import PropTypes from "prop-types";
import ReactModal from "react-modal"
import Problems from "./../../pages/Problems.jsx";

export default class Nav extends React.Component {
    constructor() {
        super();
        this.state = {
            collapsed: true,
            showModal: false,
            showAlert: false,
            username: "",
            password: "",
            isLoggedIn: this.getInitialState(),
            token: "",
        };
        this.onFailLogin = this.onFailLogin.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNewAccount = this.handleNewAccount.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleOpenCheckModal = this.handleOpenCheckModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCloseCheckModal = this.handleCloseCheckModal.bind(this);
        this.logout = this.logout.bind(this);

        this.onUnload = this.onUnload.bind(this);
    }

    getInitialState() {
        if(localStorage.getItem( "loginInfo" ))  {

            if(localStorage.getItem("time")) {
                const time = parseInt(localStorage.getItem("time"));
                if((new Date().getTime() - time) > 1000*30) {  //1000 ms = 1s, 60s = 1, 60min = 1hour...
                    localStorage.setItem("userLogged", "");
                    return false
                }
            }
            return localStorage.getItem("loginInfo");
        } else {
            localStorage.setItem("userLogged", "");
            return false;
        }
    }
    toggleCollapse() {
        const collapsed = !this.state.collapsed;
        this.setState({collapsed});
    }

    handleChangeUser(event) {
        this.setState({username: event.target.value});
    }

    handleChangePass(event) {
        this.setState({password: event.target.value});
    }

    onSuccessLogin(user) {
        //display username somewhere
        alert("login successful");
        localStorage.setItem("loginInfo", "true");
        localStorage.setItem("userLogged", user);
        this.setState({isLoggedIn: true});
        this.handleCloseModal();
        this.setState({username: "", password: ""});
        setTimeout(function () { window.location.reload(true); }, 0);
    }

    onFailLogin() {
        alert("login failed, please try again");
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.username === "") {
            alert("Username Required")
        } else if(this.state.password === "") {
            alert("Password Required")
        } else {
            //insert backend call here
            //timeout waiting for callback
            let payload = {"username": this.state.username,
                "password":this.state.password}
            axios.post("http://localhost:80/api-token-auth/", payload)
                .then(response => {
                    console.log(response.data);
                    if (response.data != []) {
                        this.onSuccessLogin(this.state.username);    //username to be changed to the userid
                        // alert(this.state.username + this.state.password);
                        this.setState({token: response.data.token})
                        localStorage.setItem("JWT-token", response.data.token)
                    }
                    else {
                        this.onFailLogin()
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert("login failed, please try again");
                    this.onFailLogin()
                })
        }
    }

    onSuccessCreateAccount(user) {
        alert("account creation successful");
        this.onSuccessLogin(user)
    }

    onFailCreateAccount() {
        alert("account creation failed please use an other username or password");
    }

    handleNewAccount(event) {
        event.preventDefault();
        if(this.state.username === "") {
            alert("Username Required")
        } else if(this.state.password === "") {
            alert("Password Required")
        } else {
            //insert backend call here
            //timeout waiting for callback
            let payload = {"username": this.state.username,
                "password":this.state.password}
            axios.post("http://localhost:80/restapi/users/", payload)
                .then(response => {
                    console.log(response.data);
                    if (response.data != []) {
                        axios.post("http://localhost:80/api-token-auth/", payload)
                            .then(response => {
                                localStorage.setItem("JWT-token", response.data.token)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                        this.onSuccessCreateAccount(this.state.username);    //username to be changed to the userid
                    }
                    else {
                        this.onFailCreateAccount()
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    this.onFailCreateAccount()
                })
        }
    }

    handleOpenModal () {
        this.setState({ showModal: true });
        this.handleCloseCheckModal();
    }


    handleOpenCheckModal() {
        const test = this.props.location.pathname.toString();
        if((test !== "/problems" && test !== "/settings") && test !== "/myProblems") {
            this.handleCloseCheckModal();
        } else {
            this.setState({showAlert: true});
        }
    }

    handleCloseModal () {
        this.setState({ showModal: false });

        if(this.props.location.pathname === ("/problems" || "/settings" || "/myProblems")) {
            if (!this.state.isLoggedIn) {
                this.handleOpenCheckModal();
            }
        }
        this.setState({username: "", password: ""});
    }

    handleCloseCheckModal () {
        this.setState( {showAlert: false});
    }

    logout() {
        localStorage.removeItem("loginInfo");
        localStorage.removeItem("userLogged");
        alert("logout successful");
        this.setState({isLoggedIn: false});
        location.href = "http://localhost:8080";
    }

    onUnload() {
        const date = new Date();
        const time = (date.getTime()).toString()
        localStorage.setItem("time", time);
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload);
    }
    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload);
    }

    render() {
        const { location } = this.props;
        const { collapsed } = this.state;
        const featuredClass = location.pathname === "/" ? "active" : "";
        const helpClass = location.pathname.match(/^\/help/) ? "active" : "";
        const problemsClass = location.pathname.match(/^\/problems/) ? "active" : "";
        const myProblemsClass = location.pathname.match(/^\/myProblems/) ? "active" : "";
        const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
        const navClass = collapsed ? "collapse" : "";

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className={featuredClass}>
                                <IndexLink to={{pathname: "/", state:{login: this.state.isLoggedIn}}} onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
                            </li>
                            <li className={problemsClass}>
                                <Link to={{pathname: "problems", state:{login: this.state.isLoggedIn}}} onClick={this.toggleCollapse.bind(this)}>Problems</Link>
                            </li>
                            <li className={myProblemsClass}>
                                <Link to={{pathname: "myProblems", state:{login: this.state.isLoggedIn}}} onClick={this.toggleCollapse.bind(this)}>My Problems</Link>
                            </li>
                            <li className={settingsClass}>
                                <Link to={{pathname: "settings", state:{login: this.state.isLoggedIn}}} onClick={this.toggleCollapse.bind(this)}>Settings</Link>
                            </li>
                            <li className={helpClass}>
                                <Link to="help" onClick={this.toggleCollapse.bind(this)}>Help</Link>
                            </li>
                        </ul>
                        <a  className="btn -btn-default" onClick={this.handleOpenModal}>Login</a>
                        <a className="btn -btn-default" onClick={this.logout}>Logout</a>
                    </div>
                    <div>
                        <ReactModal
                            style={{
                                overlay:{
                                    left: "0%",
                                    right: "25%",
                                    top: "90px",
                                    height: "600px",
                                    width: "1200px"
                                }
                            }}
                            isOpen={this.state.showModal}
                            contentLabel="Minimal Modal Example">
                            <button onClick={this.handleCloseModal}>&#9587;</button>
                            <h1>Login</h1>
                            <form>
                                <label>
                                    Username: <input type="text" onChange={this.handleChangeUser}/>
                                </label>
                                <label>
                                    Password: <input type="password" onChange={this.handleChangePass}/>
                                </label>
                            </form>
                            <a className="btn -btn-action" onClick={this.handleSubmit}>Submit</a>
                            <a className="btn -btn-action" onClick={this.handleNewAccount}>Create New Account?</a>
                        </ReactModal>
                        <ReactModal
                            style={{
                                overlay:{
                                    left: "0%",
                                    right: "25%",
                                    top: "90px",
                                    height: "600px",
                                    width: "1200px"
                                }
                            }}
                            isOpen={!this.state.isLoggedIn && !this.state.showModal && (this.props.location.pathname.toString() === ("/problems")
                                ||this.props.location.pathname.toString() === ("/settings") ||this.props.location.pathname.toString() === ("/myProblems"))}
                            contentLabel="Minimal Modal Example">
                            <h1>Please Login To View This Page</h1>
                        </ReactModal>
                    </div>
                </div>
            </nav>
        );
    }
}


Nav.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }),
};

Nav.defaultProps = {
    location: {
        pathname: "",
    },
};