import React from "react"
import Textarea from "react-textarea-autosize"
import axios from "axios/index";

export default class CreateAccount extends React.Component {
    //problem = this.props;

    constructor(props) {
        super(props);
		
        this.state = {
            value:'',
            email: '',
            password: '',
			repeatedEmail: ''
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
			document.getElementById("create-account-form").reset();
        } 
        else if(this.state.email.indexOf("@") === -1){
            alert("Requires valid email")
			document.getElementById("create-account-form").reset();
        }
        else if(this.state.password.length < 6){
            alert("Password needs to be at least 6 characters long")
			document.getElementById("create-account-form").reset();
        }
		else if(this.state.email == this.state.repeatedEmail){
			alert("Your account has already been used")
			document.getElementById("create-account-form").reset();
		}
        else {
            alert("Your account has been created")
			 this.setState({repeatedEmail: this.state.email});
            event.preventDefault();
            var jsonpayload = {
                "email": this.state.email,
                "password": this.state.password,             
            }
            axios.post("http://localhost:80/restapi/problems/", jsonpayload) //need change to proper backend call
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
			
			document.getElementById("create-account-form").reset();
            //alert(this.state.field3);
            //location.href = "http://localhost:8080";
        }
    
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
