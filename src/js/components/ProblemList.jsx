import React from "react"
import ReactStars from "react-stars"
import { Link } from "react-router";
import ReactModal from "react-modal";
import Textarea from "react-textarea-autosize";
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
export default class ProblemList extends React.Component{

    constructor () {
        super();
        this.state = {
            showModal: false,
            value:"",
            rating: "",
            difficulty: ""
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRating = this.handleRating.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
        this.setState({value: ""});
        //insert backend code

    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.handleCloseModal();
        //insert backend call here
        this.setState({value: ""});
    }

    getDifficulty(problemID){
        axios.get("http://localhost:80/restapi/problems/" + problemID + "/")
            .then(response => {
                this.setState({difficulty:response.data["difficulty"]})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    getRating(problemID){
        axios.get("http://localhost:80/restapi/problems/" + problemID + "/")
            .then(response => {
                this.setState({rating:response.data["rating"]})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    setDifficulty(newDifficulty, problem){
        let jsonpayload = {
            "difficulty": newDifficulty
        }

        // console.log(JSON.stringify(jsonpayload))

        axios.patch("http://localhost:80/restapi/problems/" + problem.id + "/", jsonpayload)
            .then(response => {
                console.log(response)
                // return response.data["difficulty"]
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleRating(newRating, problem){
        this.setState({rating: event});
        let jsonpayload = {
            "title":problem.title,
            "programming_language": problem.programming_language,
            "difficulty": problem.difficulty,
            "description": problem.description,
            "solution": problem.solution,
            "author": problem.author,
            "rating": newRating
        }

        axios.put("http://localhost:80/restapi/problems/" + problem.id + "/", jsonpayload)
            .then(response => {
                console.log(response)
                // return response.data["difficulty"]
            })
            .catch(function (error) {
                console.log(error);
            })

        this.handleOpenModal();

    }

    componentDidMount() {
        // this.getDifficulty(problem.id)
        // this.getRating(problem.id)
    }

    deleteProblem(problem){
        console.log('remove' + problem.name);
        if(console.log !== ""){
            //alert("Are you sure you want to delete this problem?")
            var c = confirm("Are you sure you want to delete this problem?")
            if(c==true)
            alert("deleted")
            else
            alert("cancelled")

        }
    }



    render() {
        const { problem } = this.props;

        console.log(problem.author.username)

        const solutionsClass = location.pathname.match(/^\/solutions/) ? "active" : "";

        return (
            <div className="col-md-4">
                <h4>{problem.title}</h4>
                <p>
                    by: {problem.author.username} <br/>
                    {problem.description} <br/>
                </p>
                <p id = "diff">difficulty: </p>
                <ReactStars count={5} value={problem.difficulty} onChange = {this.setDiffRating} size={24} half={false} color2={"#fffe2b"}/>
                <p id = "rev">reviews: </p>
                <ReactStars count={5} value={problem.rating} onChange = {this.handleRating} size={24} half={false} color2={"#fffe2b"}/>
                <a  className={solutionsClass}>
                
                    <Link className="btn btn-success" to={{pathname: "/solutions", state:{ testvalue: problem}}}  >Solve</Link>
                    <button onClick={(e)=> this.deleteProblem(problem)} type="button" className="btn btn-default btn-sm">
                        Delete
                    </button>





                </a>


                <ReactModal
                    style={{
                        overlay:{
                            left: "25%",
                            right: "25%",
                            top: "90px",
                            height: "600px",
                            width: "600px"
                        }
                    }}
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example">
                    <button onClick={this.handleCloseModal}>Close</button>
                    <h1>Leave a comment (optional)</h1>
                    <Textarea style = {{width:400, height: 300}} onChange={this.handleChange}/>
                    <a className="btn -btn-default" onClick={this.handleSubmit}>Submit</a>
                </ReactModal>
            </div>
        );
    }

}
