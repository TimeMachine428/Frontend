import React from "react"
import Textarea from "react-textarea-autosize";

export default class Solutions extends React.Component {
    problem = this.props.location.state.testvalue;

    constructor(props) {
        super(props);
        this.state = {value: ''};

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
        }else {
            alert(this.state.value);
            //backend code
            //author of submission can be accessed via
            // localStorage.getItem("userLogged") which
            //returns user currently logged in
        }
        event.preventDefault();
    }

    saveProgress(event){
        if (this.state.value == ""){
            alert("Please enter a solution");
        }else{
            alert(this.state.value);
        }
        event.preventDefault();
    }

    render() {
        return(
            <div>
              <h1>{this.problem.name}</h1>
                <p>{this.problem.description}</p>
                <p>Enter solution in the box below</p>
                <Textarea style = {{width:900, height: 300}} onChange={this.handleChange}/>
                <a class="btn -btn-default" onClick={this.handleSubmit}>Submit</a>
                <button onClick={this.onFeedback1}>Success Demo</button>
                <button onClick={this.onFeedback2}>Fail Demo</button>
                <button onClick={this.saveProgress}>Save Progress</button>
            </div>
        );
    }
}