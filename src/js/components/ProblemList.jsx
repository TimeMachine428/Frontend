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


    render() {
        const{ problem } = this.props;

        const solutionsClass = location.pathname.match(/^\/solutions/) ? "active" : "";

        return (
            <div className="col-md-4">
                <h4>{problem.name}</h4>
                <p>
                    by: {problem.author} <br/>
                    {problem.description} <br/>
                </p>
                <p id = "diff">difficulty: </p>
                <ReactStars count={5} value={this.getDiffRating(problem.id)} onChange = {this.setDiffRating} size={24} half={false} color2={"#fffe2b"}/>
                <p id = "rev">reviews: </p>
                <ReactStars count={5} value={this.getRevRating(problem.id)} onChange = {this.handleRating} size={24} half={false} color2={"#fffe2b"}/>
                <a  className={solutionsClass}>
                    <Link className="btn btn-success" to={{pathname: "/solutions", state:{ testvalue: problem}}}  >Solve</Link>
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
                    <h1>Leave a comment</h1>
                    <Textarea style = {{width:400, height: 300}} onChange={this.handleChange}/>
                    <a className="btn -btn-default" onClick={this.handleSubmit}>Submit</a>
                </ReactModal>
            </div>
        );
    }

}