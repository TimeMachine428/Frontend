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
        Problems: [{
            name: "1",
            author: {
                id: 1,
                username: "fast",
                github_id: null,
            },
            description: "sk8",
            difficulty: 1,
            good: 4,
            id: 1
        },
            {
                name: "2",
                author: {
                    id: 2,
                    username: "alice",
                    github_id: null,
                },
                description: "sk8",
                difficulty: 2,
                good: 3,
                id: 2
            },
            {
                name: "3",
                author:  {
                    id: 3,
                    username: "bob",
                    github_id: null,
                },
                description: "sk8",
                difficulty: 3,
                good: 2,
                id: 3
            },
            {
                name: "4",
                author: {
                    id: 3,
                    username: "patrick",
                    github_id: null,
                },
                description: "sk8",
                difficulty: 4,
                good: 1,
                id: 4
            }
        ].map((problem, i) => <List key={i} problem={problem}/>),



    };

    Problems = [{
        name: "1",
        author: {
            id: 1,
            username: "fast",
            github_id: null,
        },
        description: "sk8",
        difficulty: 1,
        good: 4,
        id: 1
    },
        {
            name: "2",
            author: {
                id: 2,
                username: "alice",
                github_id: null,
            },
            description: "sk8",
            difficulty: 2,
            good: 3,
            id: 2
        },
        {
            name: "3",
            author:  {
                id: 3,
                username: "bob",
                github_id: null,
            },
            description: "sk8",
            difficulty: 3,
            good: 2,
            id: 3
        },
        {
            name: "4",
            author: {
                id: 3,
                username: "patrick",
                github_id: null,
            },
            description: "sk8",
            difficulty: 4,
            good: 1,
            id: 4
        }
    ];

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

        this.handleFilter(this.username)
    }


    render() {

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