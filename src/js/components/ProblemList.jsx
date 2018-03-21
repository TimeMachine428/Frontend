import React from "react"
import ReactStars from "react-stars"
import { Link } from "react-router";
import ReactModal from "react-modal";
import Textarea from "react-textarea-autosize";

export default class ProblemList extends React.Component{

    constructor () {
        super();
        this.state = {
            showModal: false,
            value:"",
            rating: ""
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

    handleRating(event){
        this.setState({rating: event});
        this.handleOpenModal();
    }

    getDiffRating(problemID){
        //go get current rating from backend with problem id
        //return (problemID + 1)
    }
    getRevRating(problemID){
        //go get current rating from backend with problem id
        //return (problemID - 1)
    }

    setDiffRating(newRating){
        //update value in backend with new rating, problem id and user id
        //window.alert(newRating)
    }

    deleteProblem(problem){
        console.log('remove' + problem.name);
        if(console.log !== ""){
            alert("Are you sure you want to delete this problem?")
        }
    }



    render() {
        const{ problem } = this.props;

        const solutionsClass = location.pathname.match(/^\/solutions/) ? "active" : "";

        let continueProblem;

        if (problem.load != null) {

            continueProblem = <Link className="btn btn-success" to={{pathname: "/solutions", state:{ testvalue: problem.load}}}  >Continue</Link>;

        }

        return (
            <div className="col-md-4">
                <h4>{problem.name}</h4>
                <p>
                    by: {problem.author.username} <br/>
                    {problem.description} <br/>
                </p>
                <p id = "diff">difficulty: </p>
                <ReactStars count={5} value={problem.difficulty} onChange = {this.setDiffRating} size={24} half={false} color2={"#fffe2b"}/>
                <p id = "rev">reviews: </p>
                <ReactStars count={5} value={problem.good} onChange = {this.handleRating} size={24} half={false} color2={"#fffe2b"}/>
                <a  className={solutionsClass}>
                
                    <Link className="btn btn-success" to={{pathname: "/solutions", state:{ testvalue: problem}}}  >Solve</Link>
                    {continueProblem}
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