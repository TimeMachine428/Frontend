import React from "react";
import axios from "axios";
import { IndexLink, Link } from "react-router";
import ReactModal from "react-modal"

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

import List from "../components/ProblemList.jsx";

export default class Problems extends React.Component {
    login = this.props.location.state.login;
    state = {
        showModal: false,
        Problems: [{
            title: "Problem1",
            author: "Bob",
            description: "Use a quick sort algorithm to sort an array of numbers",
            difficulty: 2,
            rating: 3,
            id: 1
        }].map((problem, i) => <List key={i} problem={problem}/> )
    };
    
    componentDidMount() {
        axios.get("http://localhost:80/restapi/problem/")
            .then(response => {
                console.log(response);
                const Problems = response.data.map((ent) => {
                    if (ent["difficulty"] === 0) {
                        ent["difficulty"] = null;
                    }
                    if (ent["rating"] === 0) {
                        ent["rating"] = null;
                    }
                    return ent
                }).map((problem, i) => <List key={i} problem={problem}/> );
                this.setState({Problems})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {

        const { query } = this.props.location;
        const { params } = this.props;
        const { article } = params;
        const { date, filter } = query;
        const createProblemClass = location.pathname.match(/^\/createProblem/) ? "active" : "";

        // const Problems = [
        //     {
        //         name: "merge sort",
        //         author: "Billy Joel",
        //         description: "its fast",
        //         difficulty: null,
        //         rating: null,
        //         id: 1
        //     },
        //     {
        //         name: "quick sort",
        //         author: "Scooby Doo",
        //         description: "its quick",
        //         difficulty: null,
        //         rating: null,
        //         id: 2
        //     },
        //     {
        //         name: "radix sort",
        //         author: "X",
        //         description: "its rad",
        //         difficulty: null,
        //         rating: null,
        //         id: 3
        //     },
        //     {
        //         name: "insertion sort",
        //         author: "Y",
        //         description: "its slow",
        //         difficulty: null,
        //         rating: null,
        //         id :4
        //     }
        // ].map((problem, i) => <List key={i} problem={problem}/> );

        return (
            <div>
                <h1>Problems</h1>
                <div class="row">{this.state.Problems}</div>
                <a style={{align: "top-right"}} className={createProblemClass}>
                    <Link  class="btn btn-default"  to={{pathname: '/createProblem', state:{ testvalue: params}}} >Create New Problem</Link>
                </a>
                <button>{localStorage.getItem("userLogged").toString()}</button>
                <button>{this.login.toString()}</button>
            </div>
        );
    }
}
