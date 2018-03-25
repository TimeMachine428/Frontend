import React from "react";
import axios from "axios";
import { Router } from "react-router";
import Select from "react-select";
import List from "../components/ProblemList.jsx";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export default class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);

    }


    login = this.props.location.state.login;
    username = localStorage.getItem("userLogged");
    state = {
        showModal: false,

    };


    componentDidMount() {
        console.log('mounted');
    }


    handleDelete() {
        // todo: add the logout
        //add the delete acccount
        // console.log('handle delete');
        console.log(localStorage);
        var id;

        axios.get("http://localhost:80/restapi/users/")
            .then(response => {
                console.log(response.data);
                var length = response.data.length;
                for (var i = 0; i < length; i++) {
                    if (response.data[i].username == this.username) {
                        // console.log(response.data[i].username);
                        id = response.data[i].id;
                        // console.log(id);
                    }
                }

            })
            .catch(function (error) {
                console.log(error);
            })

        
        console.log(localStorage.getItem("JWT-token"));
        var config = {
                headers: {Authorization: "JWT " + localStorage.getItem("JWT-token")}
            }
        axios.delete("http://localhost:80/restapi/users/" + id + "/", config)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })

        // localStorage.removeItem("loginInfo");
        // localStorage.removeItem("userLogged");
        // localStorage.removeItem("JTW-token");
        // localStorage.removeItem("loginInfo");
        // localStorage.removeItem("userLogged");
        // localStorage.removeItem("JTW-token")
        // alert("logout successful");
        // location.href = "http://localhost:8080";
        // var config = {
        //     headers: {Authorization: "JWT " + localStorage.getItem("JWT-token")}
        // };
        // axios.delete("http://localhost:80/restapi/users/" + user.id + "/", config)
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })   
    }




    render() {
   

        return (
            <div>
                <h1>My Profile</h1>
                    <p>
                        <a class="btn btn-success" onClick={this.handleDelete}>Delete my account</a>
                    </p>
            </div>
        );
    }

}