import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import './home.css';

export default class Home extends Component{
	constructor(props){
		super(props);
		this.state = {'country':null,'countrySelected':'Select Country','name':'','age':'','nameError':false,'ageError':false,'stateError':false,'sex':'male','success':false};
		this.eachCountry = this.eachCountry.bind(this);
		this.sexSelected = this.sexSelected.bind(this);
	}
	componentDidMount(){
	    fetch('https://restcountries.eu/rest/v1/region/Europe',{
             method:'GET' 
        }).then(res=>res.json()).then(
           (result) => {
           	 this.setState({country:result});
           }
		);
	}
	onSubmit(){
		let isSubmit = true;
		this.setState({'nameError':false,'ageError':false,'stateError':false});
        if(this.state.countrySelected == "Select Country"){
        	isSubmit = false;
        	this.setState({stateError:true});
        }
        if(this.state.name == ""){
        	isSubmit = false;
        	this.setState({nameError:true});
        }
        if(this.state.age == ""){
        	isSubmit = false;
        	this.setState({ageError:true});
        }
        if(isSubmit){
        	let date = new Date();
        	let obj = {
        		name:this.state.name,
        		age:this.state.age,
        		sex:this.state.sex,
        		country:this.state.countrySelected,
        		dateOfCreated:date
        	}
        	fetch('/user', {
			  method: 'post',
			  headers: {
			    'Accept': 'application/json, text/plain, */*',
			    'Content-Type': 'application/json'
			  },
			  body: JSON.stringify(obj)
			}).then(res=>res.json())
			  .then(res => {
			  	if(res.status){
			  	  localStorage.setItem('name', res.data.name);	
                  this.setState({success:true})
			  	}
			  });
        }
	}
	countryChange(event){
        this.setState({countrySelected: event.target.value,stateError:false});
    }
    nameChange(event){
        this.setState({name: event.target.value,nameError:false});
    }
    ageChange(event){
        this.setState({age: event.target.value,ageError:false});
    }
    sexSelected(event){
		this.setState({sex:event.target.value});
	}
	eachCountry(obj){
      return <option value={obj.name} key={obj.alpha2Code}>{obj.name}</option>
	}
	render(){
		let country = [];
		if(this.state.success){
			return <Redirect to="/success"/>
		}
		if(this.state.country != null){
		   country = [{name:'Select Country',alpha2Code:'0'}];
		   country = country.concat(this.state.country);
           country = country.map((obj)=>{
               return this.eachCountry(obj);
           })
           return(
			<div className="form-content">
               <div className="form-header">
                  Some Useful Government Service
               </div>
               <div className="form-body">
                 <div className="form-field">
                    <span className="form-lable">Name</span>
                    <input type="text" placeholder="Please Enter Your Name..." className="user-name" value={this.state.name} onChange={this.nameChange.bind(this)}/>
                    {this.state.nameError ? <div className="error-message">Name can't be empty...</div> : ""}
                 </div>
                 <div className="form-field">
                    <span className="form-lable">Sex</span>
                      <div className="radio-group">
	                      <input type="radio" name="gender" value="male"  onChange={this.sexSelected} checked = {this.state.sex == "male"}/> Male
	                      <input type="radio" name="gender" value="female" onChange={this.sexSelected} checked = {this.state.sex == "female"}/> Female
                      </div>
                 </div>
                 <div className="form-field">
                    <span className="form-lable">Age</span>
                    <input type="number" placeholder="Please Enter Your Age..." className="user-age" value={this.state.age} onChange={this.ageChange.bind(this)}/>
                    {this.state.ageError ? <div className="error-message">Age field can't be empty...</div> : ""}
                 </div>
                 <div className="form-field">
                    <span className="form-lable">Country</span>
                    <select value={this.state.countrySelected} onChange={this.countryChange.bind(this)}>
                       {country}
                    </select>
                    {this.state.stateError ? <div className="error-message">You must select country...</div> : ""}
                 </div>
               </div>
               <div className="form-field">
                 <div className="submit" onClick={this.onSubmit.bind(this)}>Submit</div>
               </div>
			</div>
		   )
		}else{
			return(<div></div>)
		}

	}
}