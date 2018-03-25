import React from "react";

export default class Resources extends React.Component {
   render() {
    return (
    	<div class="container">
    		<div class="row">
    			<h1>Resources</h1>	
    		</div>
    		<div class="row">
	    		<div class="col-sm-4">
	    			<h3>Programming Languages</h3>
	    	 		<a class="badge badge-light" href="https://www.learnpython.org/" target="_blank"> Python </a> <br/>
	    	 		<a class="badge badge-light" href="http://www.learncpp.com/" target="_blank"> C++ </a> <br/>
	    	 		<a class="badge badge-light" href="http://www.learncs.org/" target="_blank"> C# </a> <br/>
	    	 		<a class="badge badge-light" href="http://www.learn-js.org/" target="_blank"> JavaScript </a> <br/>
	    	 		<a class="badge badge-light" href="http://www.learnrubyonline.org/" target="_blank"> Ruby </a> <br/>

	    		</div>	
	    		<div class="col-sm-4">
	    			<h3>Data Structures</h3>
	    	 		<a class="badge badge-light" href="https://www.cs.cmu.edu/~adamchik/15-121/lectures/Linked%20Lists/linked%20lists.html" target="_blank"> Linked List </a> <br/>
	    	 		<a class="badge badge-light" href="https://www.hackerearth.com/practice/data-structures/stacks/basics-of-stacks/tutorial/" target="_blank"> Stack </a> <br/>
	    	 		<a class="badge badge-light" href="https://www.hackerearth.com/practice/data-structures/queues/basics-of-queues/tutorial/" target="_blank"> Queue </a> <br/>
	    	 		<a class="badge badge-light" href="https://www.topcoder.com/community/data-science/data-science-tutorials/introduction-to-graphs-and-their-data-structures-section-1/" target="_blank"> Graph </a> <br/>
	    	 		<a class="badge badge-light" href="http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_1.htm" target="_blank"> Trees </a> <br/>
	    	 		<a class="badge badge-light" href="https://www.hackerearth.com/practice/data-structures/hash-tables/basics-of-hash-tables/tutorial/" target="_blank"> Hash Table </a> <br/>	
	    		</div>	
	    		<div class="col-sm-4">
	    			<h3>Algorithms</h3>
	    			<a class="badge badge-light" href="https://www.hackerearth.com/practice/algorithms/graphs/breadth-first-search/tutorial/" target="_blank"> Breadth First Search </a> <br/>
	    			<a class="badge badge-light" href="https://www.hackerearth.com/practice/algorithms/graphs/depth-first-search/tutorial/" target="_blank"> Depth First Search </a> <br/>
	    		</div>	
    		</div>
    	</div>
    );
  }
}
