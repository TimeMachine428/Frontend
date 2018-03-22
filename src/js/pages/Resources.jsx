import React from "react";

export default class Resources extends React.Component {
   render() {
   	var styles={

   	}

    return (
    	<div class="container">
    		<div class="row">
    			<h1>Resources</h1>	
    		</div>
    		<div class="row">
	    		<div class="col-4">
	    	 		<a class="badge badge-light" href="http://www.learncpp.com/" target="_blank"> C++ </a>
	    	 		<div class="preview">
	    	 			<iframe src="http://www.learncpp.com/" width = "300px" height = "300px" scrolling="no"></iframe>
	    	 		</div>
	    		</div>	
    		</div>
    	</div>
    );
  }
}
