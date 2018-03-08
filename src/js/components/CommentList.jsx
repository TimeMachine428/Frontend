import React from "react"
import ReactDisqusComments from "react-disqus-comments"
export default class CommentList extends React.Component {

    handleNewComment(comment) {
        window.alert(comment);
    }
    render() {
        return (

            <ReactDisqusComments
                shortname="example"
                identifier="something-unique-12345"
                title="Example Thread"
                url="http://www.example.com/example-thread"
                category_id="123456"
                onNewComment={this.handleNewComment}/>
        );
    }
}