import React from "react";
import axios from "axios";
import { IndexLink, Link } from "react-router";
// import { Button } from 'react-native';
import ReactModal from "react-modal"

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
import Select from "react-select";

import List from "../components/ProblemList.jsx";
var sortBy = require('lodash.sortby');
var _ = require('underscore')._;


export default class Problems extends React.Component {
    state = {
        showModal: false,
        Problems: [{
            title: "1",
            author: {
                id: 1,
                username: "fast",
                github_id: null,
            },
            description: "sk8",
            difficulty: 1,
            rating: 4,
            id: 1
        },

            {
                title: "2",
                author: {
                    id: 1,
                    username: "fast",
                    github_id: null,
                },
                description: "sk8",
                difficulty: 2,
                rating: 3,
                id: 2
            },
            {
                title: "3",
                author: {
                id: 1,
                username: "fast",
                github_id: null,
            },
                description: "sk8",
                difficulty: 3,
                rating: 2,
                id: 3
            },
            {
                title: "4",
                author: {
                id: 1,
                username: "fast",
                github_id: null,
            },
                description: "sk8",
                difficulty: 4,
                rating: 1,
                id: 4
            }
        ].map((problem, i) => <List key={i} problem={problem}/> ),
        selectedOption: '',
        searchTerm: '',
    };

    Problems = [{
        title: "1",
        author: {
            id: 1,
            username: "fast",
            github_id: null,
        },
        description: "sk8",
        difficulty: 1,
        rating: 4,
        id: 1
    },
        {
            title: "2",
            author: {
                id: 2,
                username: "alice",
                github_id: null,
            },
            description: "sk8",
            difficulty: 2,
            rating: 3,
            id: 2
        },
        {
            title: "3",
            author:  {
                id: 3,
                username: "bob",
                github_id: null,
            },
            description: "sk8",
            difficulty: 3,
            rating: 2,
            id: 3
        },
        {
            title: "4",
            author: {
                id: 3,
                username: "patrick",
                github_id: null,
            },
            description: "sk8",
            difficulty: 4,
            rating: 1,
            id: 4
        }
    ];

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
                });
                this.Problems = problems;
                problems = problems.map((problem, i) => <List key={i} problem={problem}/>);
                this.setState({Problems: problems});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleChange = (selectedOption) => {
        console.log(selectedOption);
        this.setState({ selectedOption });
        console.log(`Selected: ${selectedOption.label}`);
        this.handleFilter(selectedOption.label);
    }

    handleFilter(label){
        if(label === ("Difficulty: low to high")) {
            var sortedObj = _.sortBy(this.Problems, function (character) { return character.difficulty ; });
            const filtered = sortedObj.map((problem, i) => <List key={i} problem={problem}/> )
            this.setState({Problems: filtered});
        }
        if(label === ("Difficulty: high to low")) {
            var sortedObj = _.sortBy(this.Problems, function (character) { return character.difficulty ; });
            const filtered = sortedObj.reverse().map((problem, i) => <List key={i} problem={problem}/> )
            this.setState({Problems: filtered});
        }
        if(label === ("Rating: low to high")){
            var sortedObj = _.sortBy(this.Problems, function (character) { return character.rating ; });
            const filtered = sortedObj.map((problem, i) => <List key={i} problem={problem}/> );
            this.setState({Problems: filtered});
        }
        if(label === ("Rating: high to low")){
            var sortedObj = _.sortBy(this.Problems, function (character) { return character.rating ; });
            const filtered = sortedObj.reverse().map((problem, i) => <List key={i} problem={problem}/> );
            this.setState({Problems: filtered});
        }
        if(label == "New"){
            const newestProblems = this.Problems.reverse().map((problem, i) => <List key={i} problem={problem}/> );
            this.setState({Problems: newestProblems});
        }
        if(label == "Beginner"){
            const temp = [];
            for(let problem of this.Problems){
                if(problem.difficulty < 3){
                    temp.push(problem);
                }
            }
            console.log(temp);
            const beginnerProblems = temp.map((problem, i) => <List key={i} problem={problem}/> );
            this.setState({Problems: beginnerProblems});
        }
        if(label == "Intermediate"){
            const temp = [];
            for(let problem of this.Problems){
                if(problem.difficulty == 3){
                    temp.push(problem);
                }
            }
            console.log(temp);
            const intermediateProblems = temp.map((problem, i) => <List key={i} problem={problem}/> );
            this.setState({Problems: intermediateProblems});
        }
        if(label == "Expert"){
            const temp = [];
            for(let problem of this.Problems){
                if(problem.difficulty > 3){
                    temp.push(problem);
                }
            }
            console.log(temp);
            const expertProblems = temp.map((problem, i) => <List key={i} problem={problem}/> );
            this.setState({Problems: expertProblems});
        }
    }

    handleSearch = (searchTerm) => {
        // console.log("hello");
        const temp = [];
            for(let problem of this.Problems){
                if(problem.title.indexOf(this.state.searchTerm) !== -1) {
                    temp.push(problem);
                }
                else if(problem.description.indexOf(this.state.searchTerm) !== -1) {
                    temp.push(problem);
                }
            }
            console.log(temp);
            const searchedProblems = temp.map((problem, i) => <List key={i} problem={problem}/> );
            this.setState({Problems: searchedProblems});
    }

    searchTemp(event) {
        this.setState({searchTerm : event.target.value});
        // console.log("bebye");
    }


    render() {

        const {query} = this.props.location;
        const {params} = this.props;
        const {article} = params;
        const createProblemClass = location.pathname.match(/^\/createProblem/) ? "active" : "";


        const {selectedOption} = this.state;
        const value = selectedOption && selectedOption.value;
        const filtered = [];

        let noProblemMessage;
        if (this.state.Problems.length === 0) {

            noProblemMessage = <h1> No problems to display </h1>;
        }


        return (
            <div>
                <h1>Problems</h1>
                <p>Search by : <input type="text" onChange={this.searchTemp.bind(this)}/>
                    <a class="btn btn-success" onClick={this.handleSearch}>Search</a>

                </p>
                <Select
                    name="form-field-name"
                    value={value}
                    placeholder="Filter by..."
                    onChange={this.handleChange}
                    options={[
                        { value: 'Difficulty: high to low', label: 'Difficulty: high to low' },
                        { value: 'Difficulty: low to high', label: 'Difficulty: low to high' },
                        { value: 'Rating: high to low', label: 'Rating: high to low' },
                        { value: 'Rating: low to high', label: 'Rating: low to high' },
                        { value: 'New', label: 'New' },
                        { value: 'Beginner', label: 'Beginner' },
                        { value: 'Intermediate', label: 'Intermediate' },
                        { value: 'Expert', label: 'Expert' },
                    ]}
                />

                {noProblemMessage}

                <a  className={createProblemClass}></a>
                    <Link class="btn btn-success" to={{pathname: '/createProblem', state:{ testvalue: params}}}>Add Problem</Link>
                <div class="row">{this.state.Problems}</div>
                <a style={{align: "top-right"}} className={createProblemClass}>
                </a>
                <div class="row">{Problems}</div>
            </div>
        );
    }
}
