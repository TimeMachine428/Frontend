import React from "react"
import Textarea from "react-textarea-autosize"
import {Route, Redirect, hashHistory, Link} from 'react-router'
import axios from "axios/index";
import {createHashHistory} from 'history'
import PropTypes from "prop-types";

export default class CreateProblem extends React.Component {

    problem = this.props;
    editProblem;

    constructor(props) {
        super(props);
        this.editProblem = this.props.location.state.testvalue;
        console.log(this.editProblem);

        this.state = {
            value: '',
            title: this.editProblem.title,
            type: this.editProblem.type,
            difficulty: this.editProblem.difficulty,
            description: this.editProblem.description,
            testCases: [],
            testCase: {
                method: "",
                inputs: "",
                outputs: "",
            },
            redirect: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleTestCaseChange = this.handleTestCaseChange.bind(this);
        this.handleAddTestCase = this.handleAddTestCase.bind(this);
        this.handleRemoveTestCase = this.handleRemoveTestCase.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        if (this.editProblem) {
            axios.get("http://localhost:80/restapi/problems/" + this.editProblem.id + "/testcases/")
                .then(response => {
                    const newState = {...this.state};
                    newState.testCases = response.data;
                    this.setState(newState);
                });
        }
    }

    handleChange(event) {
        event.preventDefault();

        const newState = {...this.state};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    handleAddTestCase(event) {
        const newState = {...this.state};
        newState.testCases.push({...newState.testCase});
        this.setState(newState);

        event.preventDefault();
    }

    handleRemoveTestCase(event, i) {
        const newState = {...this.state};
        const [ deleted ] = newState.testCases.splice(i, 1);
        this.setState(newState);

        if (deleted.id && this.editProblem) {
            const config = {
                headers: {Authorization: "JWT " + localStorage.getItem("JWT-token")}
            };
            axios.delete("http://localhost/restapi/problems/" + this.editProblem.id + "/testcases/" + deleted.id + "/", config);
        }

        event.preventDefault();
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.title == "" || this.state.type == "" || this.state.description == "" || this.state.difficulty == "" || this.state.testCases.length == 0) {
            alert("Please Fill All Fields")
        } else {
            var jsonpayload = {
                "title": this.state.title,
                "difficulty": this.state.difficulty,
                "description": this.state.description,
            };

            var config = {
                headers: {Authorization: "JWT " + localStorage.getItem("JWT-token")}
            };

            let updatePromise;
            if (this.editProblem) {
                updatePromise = axios.put("http://localhost/restapi/problems/" + this.editProblem.id + "/", jsonpayload, config);
            } else {
                updatePromise = axios.post("http://localhost/restapi/problems/", jsonpayload, config);
            }

            updatePromise
                .then(response => {
                    console.log(response);
                    // const history = createHashHistory()
                    // location.href = "http://localhost:8080/#/problems/"
                    // this.setState({redirect: <Link to={{pathname: "problems", state:{login: this.state.isLoggedIn}}}></Link>})

                    const testCaseUrl = "http://localhost:80/restapi/problems/" + response.data.id + "/testcases/";

                    Promise.all(this.state.testCases.map(testCase => {
                        if (!testCase.id) {
                            return axios.post(testCaseUrl, testCase, config);
                        }
                    })).then(() => {
                       alert("Problem created");
                    });
                })
                .catch(error => {
                    console.log(error);
                });

        }
    }

    handleTestCaseChange(event) {
        const newState = {...this.state};
        newState.testCase[event.target.name] = event.target.value;
        this.setState(newState)
    }

    render() {
        console.log(this.problem);

        const testCaseRows = this.state.testCases.map((testCase, i) => (
            <tr>
                <td>{testCase.method}</td>
                <td>{testCase.inputs}</td>
                <td>{testCase.outputs}</td>
                <td><button className="btn btn-default" onClick={event => {
                    this.handleRemoveTestCase(event, i)
                }}><span className="glyphicon glyphicon-trash"></span></button></td>
            </tr>
        ));

        return (
            <div>
                <form>
                    <p>Enter the title of the problem in the box below</p>
                    <p><input type="text" name="title" onChange={this.handleChange} value={this.state.title}/></p>
                    <p>Enter the problem type below</p>
                    <p><input type="text" name="type" onChange={this.handleChange} value={this.state.type}/></p>
                    <p>Enter the estimated difficulty level on a scale from 1-5</p>
                    <p><input type="text" name="difficulty" onChange={this.handleChange} value={this.state.difficulty}/></p>
                    <p>Enter your problem in the box below</p>
                    <p><Textarea name="description" style={{width: 300, height: 300}} value={this.state.description} onChange={this.handleChange}/></p>

                    <div className="panel panel-default">
                        <div className="panel-heading">Test Cases</div>

                        <table className="table">
                            <thead>
                            <tr>
                                <th>Method</th>
                                <th>Inputs</th>
                                <th>Outputs</th>
                            </tr>
                            </thead>
                            <tbody>
                            {testCaseRows}
                            </tbody>
                        </table>

                        <div className="panel-footer">
                            <form className="form">
                                <div className="form-group">
                                    <label for="testcase-method">Method</label>
                                    <input id="testcase-method" className="form-control" type="text" name="method" onChange={this.handleTestCaseChange} />
                                    <div className="help-text">
                                        The name of the method to call in the submitted code
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="testcase-inputs">Inputs</label>
                                    <input id="testcase-inputs" className="form-control" type="text" name="inputs" onChange={this.handleTestCaseChange} />
                                    <div className="help-text">
                                        A JSON encoded array of inputs to pass into the method
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="testcase-outputs">Outputs</label>
                                    <input id="testcase-outputs" className="form-control" type="text" name="outputs" onChange={this.handleTestCaseChange} />
                                    <div className="help-text">
                                        A JSON encoded array of expected outputs from the method
                                    </div>
                                </div>
                                <button className="btn btn-primary" onClick={this.handleAddTestCase}><span className="glyphicon glyphicon-plus"></span></button>
                            </form>
                        </div>
                    </div>

                    <a className="btn btn-default" onClick={this.handleSubmit}>Submit</a>
                    {/*{this.state.redirect}*/}
                    <h1>{this.problem.name}</h1>
                    <p>{this.problem.description}</p>
                </form>
            </div>
        );
    }
}

CreateProblem.contextTypes = {
    router: PropTypes.object
};
