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
        id: '',
    };


    componentDidMount() {
        console.log('mounted');
    }


    handleDelete() {
		
		if(comfirm("Are you sure you wish to delete your account?")==true){
			// todo: add the logout
			//add the delete acccount
			// console.log('handle delete');
			console.log(localStorage);
			// var id;
		
			axios.get("http://localhost:80/restapi/users/")
				.then(response => {
					// console.log(response.data);
					var length = response.data.length;
					for (var i = 0; i < length; i++) {
						if (response.data[i].username == this.username) {
							// console.log(response.data[i].username);
							this.state.id = response.data[i].id;
							console.log(this.state.id);
							var config = {
								headers: {Authorization: "JWT " + localStorage.getItem("JWT-token")}
							}
							axios.delete("http://localhost:80/restapi/users/" + this.state.id + "/", config)
								.then(response => {
									console.log(response);
									localStorage.removeItem("loginInfo");
									localStorage.removeItem("userLogged");
									localStorage.removeItem("JTW-token"); 
									location.href = "http://localhost:8080";

								})
							.catch(error => {
								console.log(error);
							})
									}
								}

							})
				.catch(function (error) {
					console.log(error);
				})
			console.log('rip');
		}
    }




    render() {
   

        return (
            <div>
                <h1>My Profile</h1>
                    <p>
                        <a class="btn btn-danger" onClick={this.handleDelete}>Delete my account</a>
                    </p>
            </div>
        );
    }

}