import React,{Component} from 'react';
import './success.css'; 
export default class Success extends Component{
	constructor(props){
      super(props);
      this.state = {name:''};
	}
	componentDidMount(){
		this.setState({name:localStorage.getItem('name')});
	}
	render(){
		return(
			<div className="success-div">
			  <div className="success-header">Application Complete</div>
			  <div className="success-message">{this.state.name} Thankyou for applying to this useful government service.</div>
			</div>
		)
	}
} 
