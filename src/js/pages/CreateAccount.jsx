import React from "react"
import Textarea from "react-textarea-autosize"
import axios from "axios/index";

export default class CreateAccount extends React.Component {
    //problem = this.props;

    constructor(props) {
        super(props);
		
        this.state = {
            value:"",
            email: "",
            password: "",
			repeatedEmail: ""
        };
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange1(event) {
        this.setState({email: event.target.value});
        console.log(this.state);

    }

    handleChange2(event) {
        this.setState({password: event.target.value});
        console.log(this.state);
    }


    handleSubmit(event) {
        if (this.state.email == "" || this.state.password == "" ) {
            alert("Please enter your email address and password to create an account")
			// document.getElementById("create-account-form").reset();
        } 
        else if(this.state.email.indexOf("@") === -1){
            alert("Requires valid email")
			// document.getElementById("create-account-form").reset();
        }
        else if(this.state.password.length < 6){
            alert("Password needs to be at least 6 characters long")
			// document.getElementById("create-account-form").reset();
        }
		else if(this.state.email == this.state.repeatedEmail){
			alert("Your account has already been used")
			// document.getElementById("create-account-form").reset();
		}
        else {
            alert("Your account has been created")
            this.setState({repeatedEmail: this.state.email});
            event.preventDefault();
            // event.preventDefault();
            let payload = {"username": this.state.email,
                "password":this.state.password}
            axios.post("http://localhost:80/restapi/users/", payload)
                .then(response => {
                    console.log(response.data);
                    this.onSuccessCreateAccount(this.state.email);    //username to be changed to the userid
                    if (response.data != []) {
                        axios.post("http://localhost:80/api-token-auth/", payload)
                            .then(response => {
                                localStorage.setItem("JWT-token", response.data.token)
                                this.onSuccessLogin(this.state.email)
                                location.href = "http://localhost:8080";
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                    else {
                        this.onFailCreateAccount()
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    this.onFailCreateAccount()
                })

			
			document.getElementById("create-account-form").reset();
            //alert(this.state.field3);
        }
    
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

    onSuccessCreateAccount(user) {
        alert("account creation successful");
    }

    onFailCreateAccount() {
        alert("account creation failed please use an other username or password");
    }

	
    render()
        {
           // console.log(this.problem);

            return (
                <div>
					<h2> Sign up with your email address </h2>
                    <form id="create-account-form">
                        <p>Email address</p>
                        <p><input type="text" onChange={this.handleChange1}/></p>
                        <p>Password</p>						
                        <p><input type="password" onChange={this.handleChange2}/></p>
                        <a class="btn btn-success" onClick={this.handleSubmit}>Sign up</a>
                    </form>
                </div>
            );
        }
    }
