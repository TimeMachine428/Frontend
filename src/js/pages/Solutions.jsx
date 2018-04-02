import React from "react"
import Textarea from "react-textarea-autosize";
import TestCaseList from "../components/TestCaseList.jsx";
import axios from "axios/index";


export default class Solutions extends React.Component {
    problem = this.props.location.state.testvalue;

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            showTestCases: false,
            testcases: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFeedback1 = this.onFeedback1.bind(this);
        this.onFeedback2 = this.onFeedback2.bind(this);
        this.saveProgress = this.saveProgress.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    onFeedback1() {
        alert("Good Job! you Completed the Problem");
    }
    onFeedback2() {
        alert("Please Try Again");
    }

    handleSubmit(event) {
        if (this.state.value == ""){
            alert("Please enter a solution");
        } else {
            //backend code
            //author of submission can be accessed via
            // localStorage.getItem("userLogged") which
            //returns user currently logged in
            const solution = {
                code: this.state.value,
                language: "python",
            };
            const config = {
                headers: {Authorization: "JWT " + localStorage.getItem("JWT-token")}
            };

            axios.post("http://localhost/restapi/problems/" + this.problem.id + "/solutions/", solution, config)
                .then(response => {
                    this.setState({
                        value: this.state.value,
                        showTestCases: true,
                        testcases: response.data.jobs,
                    });

                    const intervalId = setInterval(() => {
                        axios.get("http://localhost/restapi/problems/" + this.problem.id + "/solutions/" + response.data.id + "/", config)
                            .then(resp => {
                                this.setState({
                                    value: this.state.value,
                                    showTestCases: true,
                                    testcases: resp.data.jobs,
                                });

                                const done = this.state.testcases.reduce((acc, testCase) => {
                                    return acc && testCase.completed;
                                }, true);

                                if (done) {
                                    clearInterval(intervalId);
                                }
                            })
                    }, 400)
                });
        }

        event.preventDefault();
    }

    saveProgress(event){
        if (this.state.value == ""){
            alert("Please enter a solution");
        }else{
            alert(this.state.value);
            const solution = {
                code: this.state.value,
                language: "python",
            };
            const config = {
                headers: {Authorization: "JWT " + localStorage.getItem("JWT-token")}
            };

            axios.post("http://localhost/restapi/problems/" + this.problem.id + "/partial-solutions/", solution, config)
                .then(response => {
                    /*this.setState({
                        value: this.state.value,
                        showTestCases: true,
                        testcases: response.data.jobs,
                    });*/

                });
        }
        event.preventDefault();
    }

    render() {
        const testCaseList = this.state.showTestCases ? (
            <TestCaseList testcases={this.state.testcases}/>
        ) : (
            <span></span>
        );

        return(
            <div>
              <h1>{this.problem.name}</h1>
                <p>{this.problem.description}</p>
                <p>Enter solution in the box below</p>
                <Textarea style = {{width:900, height: 300}} defaultValue={this.props.location.state.solution} onChange={this.handleChange}/>
                <button onClick={this.saveProgress}>Save Progress</button>

                <a className="btn btn-default" onClick={this.handleSubmit}>Submit</a>
                {testCaseList}
            </div>
        );
    }
}