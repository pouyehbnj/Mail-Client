import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BootstrapTable, TableHeaderColumn} 
        from 'react-bootstrap-table'
//import {useTable} from 'react-table';

import axios from 'axios';
//import { response } from 'express';

import SunEditor, { buttonList } from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';


var loginInfo = {
  email: "",
  password: "",
  token: "",
}
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  handleUpdateMe() {
    this.props.onClick();
  }
  login(){
    this.callApi()
    // 
        .then(response => {
        loginInfo.token = response.token;
        console.log('loginIngo', JSON.stringify(loginInfo))
        this.forceUpdate();
         } )
       
      
  }
    callApi = async () => {
      console.log("injaaaaaaa :" +loginInfo.email)
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ "email": loginInfo.email, "password": loginInfo.password })
    };
       console.log('hiii-zahraaaaaaaaaaaaaaa')
       const response = await fetch('http://localhost:5001/api/login' , { method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body:  JSON.stringify({ "email": loginInfo.email, "password": loginInfo.password })
     })
    //  .then(response => response.json())
       console.log('response'+response)
       const body = await response.json();
       
        console.log(body)
      return body;
    };
    updateMe() {
      console.log('updating meeee')
      this.forceUpdate();
    }
  
  render(){
    if (loginInfo.token != "") {
      return (
        <div>
          <NavBar title="Étoile Email Manager" user={loginInfo.email} />
          <MainContainer onClick={this.updateMe.bind(this)} />
        </div>
      )
    } else {
      return (
        <div>
          <NavBar title="Étoile Email Manager" user={loginInfo.email} />
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Login onClick={this.login.bind(this)} />
            </div>
          </div>
        </div>
      )
    }
  }
}
class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }
  handleSubmitClick() {
    console.log("Handling Submit...")
    this.props.onClick();
  }
  render() {
    return (

      <form>
        <h3>Étoile Email Manager</h3>
        <div className="form-group">
          <label>Email address</label>
          {/* <input type="email" className="form-control col-xs-4" placeholder="Enter email"
            onChange={e => this.setState({ email: e.target.value })} /> */}
          <input type="text" className="form-control col-xs-4" placeholder="Enter email"
            onChange={e => loginInfo.email = e.target.value} />
        </div>
        <div className="form-group">
          <label>Password</label>
          {/* <input type="password" className="form-control" placeholder="Enter password"
            onChange={e => this.setState({ password: e.target.value })} /> */}

          <input type="text" className="form-control" placeholder="Enter password"
            onChange={e => loginInfo.password = e.target.value} />
        </div>
        <button type="button" className="btn btn-info btn-block more" onClick={this.handleSubmitClick.bind(this)}>Submit</button>
      </form>

    );
}
}
  /*state = {
    response: '',
    post: '',
    responseToPost: '',
  };*/

/* 




  callApi = async () => {
    console.log('hiii')
    const response = await fetch('/api/hello');
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
      
    });
    const body = await response.text();
    console.log(body)
    this.setState({ responseToPost: body });
  }; */

 // render() {
   // console.log('In Render');
   // return (
     // <div className="App">
       // <header className="App-header">
         // <img src={logo} className="App-logo" alt="logo" />
          //<p>
            //Edit <code>src/App.js</code> and save to reload.
          //</p>
          //<a
            //className="App-link"
            //href="https://reactjs.org"
            //target="_blank"
            //rel="noopener noreferrer"
          //>
            //Learn React
          //</a>
        //</header>
        //<p>{this.state.response}</p>
        //<form onSubmit={this.handleSubmit}>
         // <p>
          //  <strong>Post to Server:</strong>
          //</p>
          //<input
            //type="text"
            //value={this.state.post}
           // onChange={e => this.setState({ post: e.target.value })}
          ///>
          //<button type="submit">Submit</button>
        //</form>
        //<p>{this.state.responseToPost}</p>
      //</div>
   // );
  //}

  class NavBar extends React.Component {
    
    render() {
      //For the purpose of this exampel, the NavBar has no interation and is just JSX.
      return (
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <img className="nav-logo" src="/haghighat.svg" width="36" height="36" />
          <a className="navbar-brand" href="#">{this.props.title}</a>
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <ul className="navbar-nav ml-auto">
            
            <li className="nav-item active">
            <a className="nav-link" href="#">&nbsp;<i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;</a>
            </li>
            <li className="nav-item active">
            <a className="nav-link" href="#">&nbsp;<i className="fa fa-th" aria-hidden="true"></i>&nbsp;</a>
            </li>
            {/*<li className="nav-item active"> 
            <a className="nav-link" href="#">{this.props.user} <span className="sr-only">(current)</span><i className="fa fa-angle-down" aria-hidden="true"></i></a>
      </li> */}
          </ul>
          </div>
        </nav>
      ) 
    }
  }
  
  class EmailLabels extends React.Component {
    
   
  
    componentDidMount() {
    
      this.callApi()
    // 
        .then(res => this.setState({  numberOfUnSeen: res.inbox}))
        .catch(err => console.log(err));
     //   console.log('hereeeee'+this.state.numberOfUnSeen)

    }
    callApi = async () => {
      console.log("injaaaaaaa :")
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFwIjp7InVzZXIiOiJ0ZXN0LmRlaGdoYW5wb3VyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiemFocmEyMjU1NDQ0MCIsImhvc3QiOiJpbWFwLmdtYWlsLmNvbSIsInBvcnQiOjk5MywidGxzIjp0cnVlLCJhdXRoVGltZW91dCI6OTAwMH0sImlhdCI6MTU5NDU4MTk2MH0.kX_ehCHmVVCEsOWEyCJuanwbJEh6WWIbZGC2ChE8ExU' },
       // body: JSON.stringify({ title: 'React POST Request Example' })
    };
      console.log('hiii-zahra')
      const response = await fetch('http://localhost:5001/api/receive/numberOf/emails' , requestOptions)
    //  .then(response => response.json())
       const body = await response.json();
       
    console.log(body)
    this.state.myBoolean=false;
      if (response.status !== 200) throw Error(body.message);
  
      return body;
    };
    
   static  defaultProps = {
      //Labels will be static for this example.
      labels: [{
        id : 1,
        name: 'Inbox',
        emailNumber : 0
      },{
        id : 2,
        name: 'Sent',
        emailNumber : 9
      }] ,
    } //Babel v6.4 Requires semicolons after class properties
    
    render() {
      console.log('hereeeee   2 '+this.props.labels.name)
      return (
        <ul className="list-group">
          {/* Iterate to create labels from the props 
          {this.props.labels.map((label) => (
              <LabelItem
                key={label.id}
                id={label.id}
                label={label}
                onClick={this.props.onLabelClick}/>
          ))} */}
          <LabelItem />
        </ul>
      )
    }
  }
  
  class LabelItem extends React.Component {
    
    state ={

      numberOfUnAll : '' ,
      numberOfSent: '' ,
      clickedInbox : false ,
      clickedSent: false
     }
      labels = {
      //Labels will be static for this example.
      labels: [{
        id : 1,
        name: 'Inbox',
        emailNumber : 0
      },{
        id : 2,
        name: 'Sent',
        emailNumber : 9
      }] ,
    } //Babel v6.4 Requires semicolons after class properties
    
    componentDidMount() {
    
      this.callApi()
    // 
        .then(res => this.setState({  numberOfUnAll: res.inbox , numberOfSent: res.sent}))
        .catch(err => console.log(err));
     //   console.log('hereeeee'+this.state.numberOfUnSeen)

    }
    callApi = async () => {
      console.log("injaaaaaaa :")
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFwIjp7InVzZXIiOiJ0ZXN0LmRlaGdoYW5wb3VyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiemFocmEyMjU1NDQ0MCIsImhvc3QiOiJpbWFwLmdtYWlsLmNvbSIsInBvcnQiOjk5MywidGxzIjp0cnVlLCJhdXRoVGltZW91dCI6OTAwMH0sImlhdCI6MTU5NDU4MTk2MH0.kX_ehCHmVVCEsOWEyCJuanwbJEh6WWIbZGC2ChE8ExU' },
       // body: JSON.stringify({ title: 'React POST Request Example' })
    };
      console.log('hiii-zahra')
      const response = await fetch('http://localhost:5001/api/receive/numberOf/emails' , requestOptions)
    //  .then(response => response.json())
       const body = await response.json();
       
    console.log(body)
    this.state.myBoolean=false;
      if (response.status !== 200) throw Error(body.message);
  
      return body;
    };
    handleClick(){
      console.log('handleClick '+this.props.id);
      this.props.onClick(this.props.id);
    }
    inboxClicked(e){
      e.preventDefault()
     // alert('hi')
     this.state.clickedInbox=true 
     this.forceUpdate()
     this.state.clickedSent=false
    // this.state.clickedInbox=false 
    }
    sentClicked(e){
      e.preventDefault()
      // alert('hi')
      this.state.clickedSent=true 
      this.forceUpdate()
      this.state.clickedInbox=false;
    //  this.state.clickedSent=false 
    }
    render(){ 
    //  console.log(this.props.state.numberOfUnSeen)
    if(!this.state.clickedInbox && !this.state.clickedSent)
{
  console.log('11111')

      return (
        
        <div>
          <button type="button" class="btn btn-primary" onClick={e=>this.inboxClicked(e)}>
  Inbox <span class="badge badge-danger ml-3"> {this.state.numberOfUnAll}</span>
</button>
<button type="button" class="btn btn-primary" onClick={e=>this.sentClicked(e)}> 
  Sent <span class="badge badge-danger ml-3"> {this.state.numberOfSent}</span>
</button>
     
      </div>
      );
}
else if(this.state.clickedInbox){
 

  {
    console.log('222222')
    return (
      <div>
    <div>
          <button type="button" class="btn btn-primary" onClick={e=>this.inboxClicked(e)}>
  Inbox <span class="badge badge-danger ml-3"> {this.state.numberOfUnAll}</span>
</button>
<button type="button" class="btn btn-primary" onClick={e=>this.sentClicked(e)}> 
  Sent <span class="badge badge-danger ml-3"> {this.state.numberOfSent}</span>
</button>
     
      </div>
     <EmailList />
    </div>
   
    );
   
}
}
else if(this.state.clickedSent){
  
  {
    console.log('33333')
    return (
      <div>
          <button type="button" class="btn btn-primary" onClick={e=>this.inboxClicked(e)}>
  Inbox <span class="badge badge-danger ml-3"> {this.state.numberOfUnAll}</span>
</button>
<button type="button" class="btn btn-primary" onClick={e=>this.sentClicked(e)}> 
  Sent <span class="badge badge-danger ml-3"> {this.state.numberOfSent}</span>
</button>
     
      <SentItem />
    </div>
    );
}
}
    }
  }
  
  class Tab extends React.Component {
    
    render(){
      console.log(this.props.activeTab);
      // Classes to add to the <a> element
      let tabClasses = ["nav-link"];
      // Classes to add to the <i> element (the icon)
      let iconClasses = ["fa",this.props.icon];
  
      // Update the class array if the state is visible
      if (this.props.activeTab) {
        tabClasses.push("active");
        console.log("active");
      }
      
      return (
          <li className="nav-item">
              <a className={tabClasses.join(' ')} href="#">
                <i className={iconClasses.join(' ')}></i>&nbsp;&nbsp;{this.props.name}
              </a>
          </li>
      )
    }
  }
  
  class EmailList extends React.Component {
    
    state = {
      inbox : 1 ,
      sent : 0 
    }
    handleEmailClick = (id) => {
      alert('Clicked'+id);
      console.log("hhhh");
    };
  showInbox(){
   // e.preventDefault()
    this.setState.inbox=1
    this.forceUpdate();
  }
  showSent(){
    //e.preventDefault()
this.setState.inbox=0
this.setState.sent=1
this.forceUpdate()
  }
    render(){
      if(this.state.inbox==1){
      return (
        
        <div>
          {/* Tabs created only as an example, they don't interact with the rest of the app. */}
          
        
          <p> 


</p>
            {/* EmailItem creation:
      {this.props.emails.map((email) => ( 
                <EmailItem
                  key={email.id}
                  email={email}
                  handleEmailClick={this.handleEmailClick}/>
            ))}  */}
            <EmailItem /> 
            
         
        </div>
      )
          }
          else{
            return (
        
              <div>
                {/* Tabs created only as an example, they don't interact with the rest of the app. */}
                <ul className="nav nav-tabs">
                  <Tab name="Inbox" activeTab={true} icon="fa-inbox" onClick={this.showInbox.bind(this)} />
                </ul>
                <ul className="nav nav-tabs">
                  <Tab name="sent" activeTab={true} icon="fa-inbox" onClick={this.showSent.bind(this)} />
                </ul>
                <div >
                  {/* EmailItem creation:
            {this.props.emails.map((email) => ( 
                      <EmailItem
                        key={email.id}
                        email={email}
                        handleEmailClick={this.handleEmailClick}/>
                  ))}  
                  <EmailItem /> */}
                  
                </div>
              </div>
            )
          }
    }
  }
  
  class EmailItem extends React.Component {
    


    myBoolean = false ;
    state = {
      emails :[]
      }
      selectedEmail = {
        text : '' ,
        subject: '' ,
        date: '' ,
        from: ''
      }
    
    componentDidMount() {
    
      this.callApi()
    // 
    .then(res => { this.setState({emails:res.emails}) 
    console.log( 'hiii'+this.state.emails[0].subject)
  })
  .catch(err => console.log(err));


    }
    callApi = async () => {
      console.log("inja :"+this.myBoolean)
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFwIjp7InVzZXIiOiJ0ZXN0LmRlaGdoYW5wb3VyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiemFocmEyMjU1NDQ0MCIsImhvc3QiOiJpbWFwLmdtYWlsLmNvbSIsInBvcnQiOjk5MywidGxzIjp0cnVlLCJhdXRoVGltZW91dCI6OTAwMH0sImlhdCI6MTU5NDM4MzcxMH0.QF9MRwzU5VZsmP3RanKpKruRf83kQ2b2-qEMcuTBXuc' },
       // body: JSON.stringify({ title: 'React POST Request Example' })
    };
      console.log('hiii-zahra')
      const response = await fetch('http://localhost:5001/api/receive/emails' , requestOptions)
    //  .then(response => response.json())
       const body = await response.json();
       
    console.log(body)
    this.state.myBoolean=false;
      if (response.status !== 200) throw Error(body.message);
  
      return body;
    };
    handleLabelClick(labelId){
      console.log(this.state.myBoolean);
      console.log('Label clicked: '+labelId);
      console.log('pydat krdm')
    }
    alertClicked(text,date,e) {
      e.preventDefault();
      this.selectedEmail.date=date
      this.selectedEmail.text=text

     this.myBoolean=true ;
     this.forceUpdate();
  
    }
   backClicked(e){
    e.preventDefault();

     this.myBoolean=false ;
     this.forceUpdate();
   }
    handleEmailClick() {
      //Call to the parent's method passed through properties.
      
      this.props.handleEmailClick(this.props.email.id);
      console.log("i am zahra");
    }
    
    render(){
      console.log('hii'+this.myBoolean)
      if(!this.myBoolean){
        return (
          <div>
      {this.state.emails.map(email => (
          <div class="list-group" > 
          <a href="#"  class="list-group-item list-group-item-action flex-column align-items-start" onClick={e=>this.alertClicked(email.text,email.date,e)} >
            <div class="d-flex w-100 justify-content-between">
            <div className="checkbox">
        <input type="checkbox" />
      </div>

        &nbsp;&nbsp;<span className="fa fa-star-o"></span>&nbsp;&nbsp;
      
              <h5 class="mb-1">{email.subject}</h5>
        
              <small class="text-muted">{email.date}</small>
            </div>
            <p class="mb-1">{email.text} </p>
          </a>
          
          
        </div>
  ))}
  </div>
        );
    }
    else{
      return(
       
      <div class="list-group" > 
       
      <a href="#"  class="list-group-item list-group-item-action flex-column align-items-start"  >
        <div class="d-flex w-100 justify-content-between">
        {/*  <h5 class="mb-1">{this.state.response}</h5> */}
          <small class="text-muted">{this.selectedEmail.date}</small>
        </div>
        <p class="mb-1">{this.selectedEmail.text} </p>
      </a>

      <button onClick={e=>this.backClicked(e)}>
         Back
    </button>
      </div>
      );
    }




    
    }
  }
  class SentItem extends React.Component{
    myBoolean = false ;
    state = {
    emails :[]
    }
    selectedEmail = {
      text : '' ,
      subject: '' ,
      date: '' ,
      from: ''
    }
    componentDidMount() {
    
      this.callApi()
    // 
   

        .then(res => { this.setState({emails:res.emails}) 
          console.log( 'hiii'+this.state.emails[0].subject)
        })
        .catch(err => console.log(err));
    
       
       
      }
    callApi = async () => {
      console.log("inja :"+this.myBoolean)
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFwIjp7InVzZXIiOiJ0ZXN0LmRlaGdoYW5wb3VyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiemFocmEyMjU1NDQ0MCIsImhvc3QiOiJpbWFwLmdtYWlsLmNvbSIsInBvcnQiOjk5MywidGxzIjp0cnVlLCJhdXRoVGltZW91dCI6OTAwMH0sImlhdCI6MTU5NDM4MzcxMH0.QF9MRwzU5VZsmP3RanKpKruRf83kQ2b2-qEMcuTBXuc' },
       // body: JSON.stringify({ title: 'React POST Request Example' })
    };
      console.log('hiii-zahra')
      const response = await fetch('http://localhost:5001/api/receive/sent/emails' , requestOptions)
    //  .then(response => response.json())
       const body = await response.json();
       
    console.log(body)
    this.state.myBoolean=false;
      if (response.status !== 200) throw Error(body.message);
  
      return body;
    };
    alertClicked(text,date,e) {
      e.preventDefault();
      this.selectedEmail.date=date
      this.selectedEmail.text=text

     this.myBoolean=true ;
     this.forceUpdate();
  
    }
   backClicked(e){
    e.preventDefault();

     this.myBoolean=false ;
     this.forceUpdate();
   }
    render(){
      if(!this.myBoolean){
        return (
          <div>
      {this.state.emails.map(email => (
          <div class="list-group" > 
          <a href="#"  class="list-group-item list-group-item-action flex-column align-items-start" onClick={e=>this.alertClicked(email.text,email.date,e)} >
            <div class="d-flex w-100 justify-content-between">
            <div className="checkbox">
        <input type="checkbox" />
      </div>

        &nbsp;&nbsp;<span className="fa fa-star-o"></span>&nbsp;&nbsp;
              <h5 class="mb-1">{email.subject}</h5>
              <small class="text-muted">{email.date}</small>
            </div>
            <p class="mb-1">{email.text} </p>
          </a>
          
          
        </div>
  ))}
  </div>
        );
    }
    else{
      return(
       
      <div class="list-group" > 
       
      <a href="#"  class="list-group-item list-group-item-action flex-column align-items-start"  >
        <div class="d-flex w-100 justify-content-between">
        {/*  <h5 class="mb-1">{this.state.response}</h5> */}
          <small class="text-muted">{this.selectedEmail.date}</small>
        </div>
        <p class="mb-1">{this.selectedEmail.text} </p>
      </a>

      <button onClick={e=>this.backClicked(e)}>
         Back
    </button>
      </div>
      );
    }


    }
  }

  
  class EmptyBox extends React.Component {
    
    render(){
      return (
        <p className="center">The email box is empty {this.props.id}</p>
      )
    }
      }
  

class showText extends React.Component {
  hi = (text) => {
    console.log('omd inja')
     this.Finaltext = text;
    // this.forceUpdate();
  }
  render() {
    console.log('hatta inja')
  return (
    <div class="list-group" > 
       
    <a href="#"  class="list-group-item list-group-item-action flex-column align-items-start"  >
      <div class="d-flex w-100 justify-content-between">
      {/*  <h5 class="mb-1">{this.state.response}</h5> */}
        <small class="text-muted">salam</small>
      </div>
      <p class="mb-1">khodafez </p>
      <small class="text-muted">this worked</small>
    </a>
    </div>
    );
  }
}
  /**
   * Main class which contains the labels and the email list.
   */
  class MainContainer extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {
        selectedLabel : 1
      }
    }
    
    handleLabelClick(labelId){
      console.log('Label clicked: '+labelId);
      console.log('pydat krdm')
      this.setState({
        selectedLabel: labelId
      });
    }
    
  
  
    render() {
     // console.log(this.props.emails[0].labelId);
     // const filteredEmails = this.props.emails.filter(e => e.labelId & e.labelId == this.state.selectedLabel);
      
     let content = null;
    //  if(filteredEmails.length > 0){
         content = <EmailLabels />;
  //    } else {
   //      content = <EmptyBox />;
  //    }
      
      return (
        <div className="container">
          
           {/* onClick={this.handleUpdateMe.bind(this) }*/}
          <ActionsRow />
          <hr />
          <div className="row">
            <div className="col-12 col-sm-12 col-md-3 col-lg-2">
             
            </div> 
            <div className="col-12 col-sm-12 col-md-9 col-lg-10">
              {content}        
            </div>
          </div>
        </div>
      )
    }
  }
  
  /**
   * Come options for showing how to emulate Gmail using Bootsrap 4.
   */
  class ActionsRow extends React.Component {
    
      clicked= false
    
     handleComposeClick(state,e){   
      e.preventDefault()
      this.clicked=true   
       this.forceUpdate()
       console.log("hereeeee pouyeh")
     }
    render(){
      console.log('bbinm chie'+ this.clicked) 
      if(!this.clicked){
      return (
        
      
        <div className="row"> 
          <div className="col-12 col-sm-12 col-md-3 col-lg-2">
            <a href="#" className="btn btn-danger btn-primary btn-block"
            onClick={e => this.handleComposeClick(this.state,e)}>
              <i className="fa fa-edit"></i> Compose
              
            </a>
          </div>
          <div className="col-12 col-sm-12 col-md-9 col-lg-10">
            <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
              <button type="button" 
               className="btn btn-secondary">&nbsp;<i className="fa fa-refresh" aria-hidden="true"></i>&nbsp;</button>
              <button type="button" className="btn btn-secondary">&nbsp;<i className="fa fa-star" aria-hidden="true"></i>&nbsp;</button>
            </div>
            <div className="btn-group" role="group">
              <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                More
              </button>
              
              <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Separated link</a>
              </div>
            </div>
        
            <div className="pull-right">
                    <button type="button" className="btn btn-secondary">&nbsp;<i className="fa fa-cog" aria-hidden="true"></i>&nbsp;</button>
              <button type="button" className="btn btn-secondary">&nbsp;<i className="fa fa-bars" aria-hidden="true"></i>&nbsp;</button>
                  </div>
          </div>
        </div>
      )
      }else{
        return(
        <ComposeMail  />
        )
      }
    } 
  }

  class ComposeMail extends React.Component {

    state = {
      to: [],
      subject: '',
      text: ''
    }
  
    setTos(state, e) {
      state.to = []
      state.to = e.target.value.split(",")
  
    }
   sendEmail(state, e) {
      e.preventDefault();
      console.log("okkkkk")
      console.log(state);
      fetch('http://localhost:5001/api/send/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFwIjp7InVzZXIiOiJ0ZXN0LmRlaGdoYW5wb3VyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiemFocmEyMjU1NDQ0MCIsImhvc3QiOiJpbWFwLmdtYWlsLmNvbSIsInBvcnQiOjk5MywidGxzIjp0cnVlLCJhdXRoVGltZW91dCI6OTAwMH0sImlhdCI6MTU5NDYyNjQ0M30.zqUnpSpAkw8VvgGrHD-2PU2Dt540mVXBWIt62SyCBLE'
        },
        body: JSON.stringify(state)
      }).then(response => {
        if (response.ok) {
          response.json().then(json => {
            console.log(json);
            state.token = json.token
            console.log('now:')
            console.log(state)
          });
        }
      })
    
    
    }    
    render(){
      return (
        <div>
        <p>
          <h>To </h>
          <input type="text" style={{ width: "380px", fontSize: 15 }} onChange={e => this.setTos(this.state, e)} />
        
        
          <h>Subject </h>
          <input type="text" style={{ width: "380px", fontSize: 15 }} onChange={e => this.setState({ subject: e.target.value })} />
        
       
          <h> Email </h>
          <SunEditor width="70%" height="100%" onChange={e => this.setState({ text: e })} />
        </p>
        <button type="submit" className="btn btn-primary btn-block" style={{ height: 50, width: 70 }}
          onClick={e => this.sendEmail(this.state, e)}>Send</button>

      </div>
      )
    }
  }
  

export default App;
