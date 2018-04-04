import React from "react";
import axios from "axios";
import { Router } from "react-router";
import Select from "react-select";
import List from "../components/ProblemList.jsx";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export default class MyProblems extends React.Component {

    username = localStorage.getItem("userLogged");
    state = {
        showModal: false,
        Problems: [],
    };

    Problems = [];

    handleFilter(username) {


        const temp = [];
        for (let problem of this.Problems) {
            if (problem.author.username === username) {
                temp.push(problem);
            }
        }
        console.log(temp);
        const myProblems = temp.map((problem, i) => <List key={i} problem={problem}/>);
        this.setState({Problems: myProblems});
    }

    componentDidMount() {

        axios.get("http://localhost:80/restapi/problems/")
            .then(response => {
                console.log(response.data);
                let problems = response.data.map((ent) => {
                    if (ent["difficulty"] === 0) {
                        ent["difficulty"] = null;
                    }
                    if (ent["rating"] === 0) {
                        ent["rating"] = null;
                    }
                    return ent
                })
                this.Problems = problems
                this.handleFilter(this.username);
            })
            .catch(function (error) {
                console.log(error);
            })
        console.log(this.username);
    }

    componentWillUnmount () {
        localStorage.removeItem('OnMyProblem');

    }

    render() {

        localStorage.setItem('OnMyProblem', true);


        let noProblemMessage;
        if (this.state.Problems.length == 0) {

            noProblemMessage = <h1> You have not created any problems </h1>;
        }


        return (
            <div>
                <h1>My Problems</h1>

                {noProblemMessage}

                <div class="row">{this.state.Problems}</div>



                <div class="row" path="/myProblems">{MyProblems}</div>
            </div>
        );
    }

}