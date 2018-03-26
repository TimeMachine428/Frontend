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

    handleSubmit(event, problem) {
        event.preventDefault();
        this.handleCloseModal();

        let jsonpayload = {
            "rating": this.state.rating
        }

        var config = {
            headers: {Authorization: "JWT " + localStorage.getItem("JWT-token")}
        }
        axios.patch("http://localhost:80/restapi/problems/" + problem.id + "/", jsonpayload, config)
            .then(response => {
                console.log(response)
                setTimeout(function () { window.location.reload(true); }, 0);
            })
            .catch(function (error) {
                console.log(error);
            })


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

    handleDifficulty(newDifficulty, problem){
        let jsonpayload = {
            "difficulty": newDifficulty
        }

        var config = {
            headers: {Authorization: "JWT " + localStorage.getItem("JWT-token")}
        }
        axios.patch("http://localhost:80/restapi/problems/" + problem.id + "/", jsonpayload, config)
            .then(response => {
                console.log(response)
                // setTimeout(function () { window.location.reload(true); }, 0);
                // return response.data["difficulty"]
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleRating(newRating){
        this.setState({rating: newRating});
        this.handleOpenModal();

    }

    componentDidMount() {
        // this.getDifficulty(problem.id)
        // this.getRating(problem.id)
    }

    deleteProblem(problem){
        console.log("remove" + problem.name);
        if(console.log !== ""){
            //alert("Are you sure you want to delete this problem?")
            var c = confirm("Are you sure you want to delete this problem?")
            if(c==true) {
                alert("deleted")
                var config = {
                    headers: {Authorization: "JWT " + localStorage.getItem("JWT-token")}
                }
                axios.delete("http://localhost:80/restapi/problems/" + problem.id + "/", config)
                    .then(response => {
                        console.log(response);
                        setTimeout(function () { window.location.reload(true); }, 0);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
            else{
                alert("cancelled")
            }


        }
    }

    editProblem(problem){
        this.props.editProblem(problem)
    }


    render() {
        const solutionsClass = location.pathname.match(/^\/solutions/) ? "active" : "";

        const { problem } = this.props;

        let deletebtn = null

        if(true) {
            deletebtn = <button onClick={(e)=> this.deleteProblem(problem)} type="button" className="btn btn-default btn-sm">Delete</button>
        }

        return (
            <div className="col-md-4">
                <h4>{problem.title}</h4>
                <p>
                    by: {problem.author.username} <br/>
                    {problem.description} <br/>
                </p>
                <p id = "diff">difficulty: </p>
                <ReactStars count={5} value={problem.difficulty} onChange = {(newValue) => {this.handleDifficulty(newValue, problem)}} size={24} half={false} color2={"#fffe2b"}/>
                <p id = "rev">reviews: </p>
                <ReactStars count={5} value={problem.rating} onChange = {(newValue) => {this.handleRating(newValue)}} size={24} half={false} color2={"#fffe2b"}/>
                <a  className={solutionsClass}>
                    <Link className="btn btn-success" to={{pathname: "/solutions", state:{ testvalue: problem}}}  >Solve</Link>
<<<<<<< HEAD
                    <button onClick={(e)=> this.deleteProblem(problem)} type="button" className="btn btn-default btn-sm"> Delete </button>
                    <button onClick={this.editProblem.bind(this, problem)}type="button" className="btn btn-default btn-sm"> Edit </button>







=======
                    {deletebtn}
>>>>>>> origin/dev
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
                    <a className="btn -btn-default" onClick={(e) => {this.handleSubmit(e, problem)}}>Submit</a>
                </ReactModal>
            </div>
        );
    }

}
