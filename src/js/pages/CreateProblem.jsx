import React from "react"
import Textarea from "react-textarea-autosize"
import axios from "axios/index";

export default class CreateProblem extends React.Component {
    problem = this.props;


    constructor(props) {
        super(props);

        this.state = {
            value:'',
            field1: '',
            field2: '',
            field3:'',
            field4: '',
            field5:''

        };
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange1(event) {
        this.setState({field1: event.target.value});
        console.log(this.state);
    }

    handleChange2(event) {
        this.setState({field2: event.target.value});
        console.log(this.state);
    }

    handleChange3(event) {
        this.setState({field3: event.target.value});
        console.log(this.state);
    }

    handleChange4(event) {
        this.setState({field4: event.target.value});
        console.log(this.state);
    }

    handleChange5(event) {
        this.setState({field5: event.target.value});
        console.log(this.state);
    }

    handleSubmit(event) {

        if (this.state.field1 == "" || this.state.field2 == "" || this.state.field3 == "" || this.state.field4 == "" || this.state.field5 == "") {
            alert("Please Fill All Fields")
        } else {
            alert("Problem has been created")
            event.preventDefault();
            var jsonpayload = {
                "title": this.state.field1,
                // "programming_language": this.state.field2,
                "difficulty": this.state.field3,
                "description": this.state.field4,
                // "solution": this.state.field5,
                // "rating": 0
            }

            console.log(localStorage.getItem("JWT-token"))
            var config = {
                headers: {Authorization: "JWT " + localStorage.getItem("JWT-token")}
            }
            axios.post("http://localhost:80/restapi/problems/", jsonpayload, config)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })

            //alert(this.state.field3);
        }
    }
        render()
        {
            console.log(this.problem);

            return (
                <div>

                    <form>
                        <p>Enter the title of the problem in the box below</p>
                        <p><input type="text" onChange={this.handleChange1}/></p>
                        <p>Enter the problem type below</p>
                        <p><input type="text" onChange={this.handleChange2}/></p>
                        <p>Enter the estimated difficulty level on a scale from 1-5</p>
                        <p><input type="text" onChange={this.handleChange3}/></p>
                        <p>Enter your problem in the box below</p>
                        <p><Textarea style={{width: 300, height: 300}} onChange={this.handleChange4}/></p>
                        <p>Enter your solution to the problem</p>
                        <p><Textarea style={{width: 300, height: 300}} onChange={this.handleChange5}/></p>
                        <a class="btn btn-default" onClick={this.handleSubmit}>Submit</a>
                        <h1>{this.problem.name}</h1>
                        <p>{this.problem.description}</p>
                    </form>
                </div>
            );
        }
    }
