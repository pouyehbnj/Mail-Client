import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BootstrapTable, TableHeaderColumn} 
        from 'react-bootstrap-table'
import {useTable} from 'react-table';

import axios from 'axios';



var loginInfo = {
  email: "",
  password: "",
  token: "",
}
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  login(){
    var api = "http://192.168.112.209:5000/api/login";
    var request = {
      method: 'post',
      url: api,
      headers: {
        'Content-Type': 'application/json',
      },
      // data: { "email": loginInfo.email, "password": loginInfo.password }
      data: { "username": loginInfo.email, "password": loginInfo.password }
    }
    axios(request)
      .then(response => {
        console.log(response)
        loginInfo.token = response.data.token;
        console.log('loginIngo', JSON.stringify(loginInfo))
        this.forceUpdate();
      }).catch(error => {
        alert("Wrong password")
        window.location.reload(false);
      })
  }
  render(){
    if (loginInfo.token != "") {
      return (
        <div>
          <NavBar title="Étoile Email Manager" user={loginInfo.email} />
          <MainContainer />
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
          <img className="nav-logo" src="https://facebook.github.io/react/img/logo.svg" width="36" height="36" />
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
      const response = await fetch('http://192.168.112.241:5000/api/receive/numberOf/emails' , requestOptions)
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
      numberOfSent: ''
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
      const response = await fetch('http://192.168.112.241:5000/api/receive/numberOf/emails' , requestOptions)
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
    hi(e){
      e.preventDefault()
      alert('hi')
    }
    render(){ 
    //  console.log(this.props.state.numberOfUnSeen)
      return (
        <div>
      <h6> Inbox   <span class="badge badge-secondary" onClick={e=>this.hi(e)}>{this.state.numberOfUnAll}</span></h6>
      <h6>Sent  <span class="badge badge-secondary">{this.state.numberOfSent}</span></h6>
      </div>
      );
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
    
    handleEmailClick = (id) => {
      alert('Clicked'+id);
      console.log("hhhh");
    };
  
    render(){
      return (
        <div>
          {/* Tabs created only as an example, they don't interact with the rest of the app. */}
          <ul className="nav nav-tabs">
            <Tab name="Inbox" activeTab={true} icon="fa-inbox" />
          </ul>
          <div >
            {/* EmailItem creation:
      {this.props.emails.map((email) => ( 
                <EmailItem
                  key={email.id}
                  email={email}
                  handleEmailClick={this.handleEmailClick}/>
            ))}  */}
            <EmailItem />
          </div>
        </div>
      )
    }
  }
  
  class EmailItem extends React.Component {
    


    myBoolean = false ;
    state = {
      response: '',
      response2: '' ,
      state: '',
      date1: '' ,
      date2: '' ,
      text1: '' ,
      text2: '' ,
      responseToPost: '',
      myBoolean : false 
    };
    state2 = {
      text: '',
      date: '' ,
    }
    
    componentDidMount() {
    
      this.callApi()
    // 
        .then(res => this.setState({ response: res.emails[2].subject , response2: res.emails[3].subject 
        ,date1: res.emails[2].date , date2: res.emails[3].date ,text1: res.emails[2].text , text2: res.emails[3].text}))
        .catch(err => console.log(err));
        console.log(this.state.response)

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
      const response = await fetch('http://192.168.112.241:5000/api/receive/emails' , requestOptions)
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
     // this.myBoolean=true ;
    //  this.forceUpdate();
     // this.setState({
     //   selectedLabel: labelId
    //  });
    }
 /*   render(){
      return (
        <p className="center">The email box is empty ....fuck you.</p>
      )
    }*/
    alertClicked(text,date,e) {
      e.preventDefault();
      this.state2.text=text ;
      this.state2.date=date ;
      //alert('You clicked the third ListGroupItem');
     this.myBoolean=true ;
     this.forceUpdate();
    this.state.myBoolean=false ;
   //  let content = <showText />;
    // var obj = new showText ;
  // obj.hi(text)
   //obj.render();
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
            <div class="list-group" > 
         
            <a href="#"  class="list-group-item list-group-item-action flex-column align-items-start" onClick={e=>this.alertClicked(this.state.text1,this.state.date1,e)} >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{this.state.response}</h5>
                <small class="text-muted">{this.state.date1}</small>
              </div>
              <p class="mb-1">{this.state.text} </p>
            </a>
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" onClick={e=>this.alertClicked(this.state.text2,this.state.date2,e)}>
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{this.state.response2}</h5>
                <small class="text-muted">{this.state.date2}</small>
              </div>
              <p class="mb-1">{this.state.text2}</p>
           
            </a>
          </div>
  
          );
      }
      else{
        return(
        <div class="list-group" > 
         
        <a href="#"  class="list-group-item list-group-item-action flex-column align-items-start"  >
          <div class="d-flex w-100 justify-content-between">
          {/*  <h5 class="mb-1">{this.state.response}</h5> */}
            <small class="text-muted">{this.state2.date}</small>
          </div>
          <p class="mb-1">{this.state2.text} </p>
        </a>
  
        <button onClick={e=>this.backClicked(e)}>
           Back
      </button>
        </div>
      
        );
      }




     /* return (
        
        <li className="list-group-item d-flex justify-content-start" onClick={this.handleEmailClick.bind(this)}>
            <div className="checkbox">
              <input type="checkbox" />
            </div>
  
            &nbsp;&nbsp;<span className="fa fa-star-o"></span>&nbsp;&nbsp;
            <span className="name">{this.props.email.from}</span> 
            <span>{this.props.email.subject}</span>
            
            <span className="ml-auto p-2">
              <span className="fa fa-paperclip">&nbsp;&nbsp;</span>
              <span className="badge badge-default badge-pill">{this.props.email.time}</span>
            </span>
          </li>
          
      )*/
    }
  }
  
  class EmptyBox extends React.Component {
    myBoolean = false ;
    state = {
      response: '',
      response2: '' ,
      state: '',
      date1: '' ,
      date2: '' ,
      text1: '' ,
      text2: '' ,
      responseToPost: '',
      myBoolean : false 
    };
    state2 = {
      text: '',
      date: '' ,
    }
    
    componentDidMount() {
    
      this.callApi()
    // 
        .then(res => this.setState({ response: res.emails[2].subject , response2: res.emails[3].subject 
        ,date1: res.emails[2].date , date2: res.emails[3].date ,text1: res.emails[2].text , text2: res.emails[3].text}))
        .catch(err => console.log(err));
        console.log(this.state.response)

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
      const response = await fetch('http://192.168.112.241:5000/api/receive/emails' , requestOptions)
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
     // this.myBoolean=true ;
    //  this.forceUpdate();
     // this.setState({
     //   selectedLabel: labelId
    //  });
    }
 /*   render(){
      return (
        <p className="center">The email box is empty ....fuck you.</p>
      )
    }*/
    alertClicked(text,date,e) {
      e.preventDefault();
      this.state2.text=text ;
      this.state2.date=date ;
      //alert('You clicked the third ListGroupItem');
     this.myBoolean=true ;
     this.forceUpdate();
    this.state.myBoolean=false ;
   //  let content = <showText />;
    // var obj = new showText ;
  // obj.hi(text)
   //obj.render();
    }
   backClicked(e){
    e.preventDefault();

     this.myBoolean=false ;
     this.forceUpdate();
   }
    render(){
      console.log('hii'+this.myBoolean)
    if(!this.myBoolean){
        return (
          <div class="list-group" > 
       
          <a href="#"  class="list-group-item list-group-item-action flex-column align-items-start" onClick={e=>this.alertClicked(this.state.text1,this.state.date1,e)} >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{this.state.response}</h5>
              <small class="text-muted">{this.state.date1}</small>
            </div>
            <p class="mb-1">{this.state.text} </p>
            <small class="text-muted">Donec id elit non mi porta.</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" onClick={e=>this.alertClicked(this.state.text2,this.state.date2,e)}>
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{this.state.response2}</h5>
              <small class="text-muted">{this.state.date2}</small>
            </div>
            <p class="mb-1">{this.state.text2}</p>
            <small class="text-muted">Donec id elit non mi porta.</small>
          </a>
        </div>

        );
    }
    else{
      return(
      <div class="list-group" > 
       
      <a href="#"  class="list-group-item list-group-item-action flex-column align-items-start"  >
        <div class="d-flex w-100 justify-content-between">
        {/*  <h5 class="mb-1">{this.state.response}</h5> */}
          <small class="text-muted">{this.state2.date}</small>
        </div>
        <p class="mb-1">{this.state2.text} </p>
      </a>

      <button onClick={e=>this.backClicked(e)}>
         Back
    </button>
      </div>
    
      );
    }
      }
  /*  return (
   <div className="App">
        <header className="App-header">
      {/*    <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
    </a> */
        //</header>
        //<p>{this.state.response}</p>
      /*  <form onSubmit={this.handleSubmit}>
         <p>
           <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
           onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form> 
  <p>{this.state.responseToPost}</p> */
      //</div>
    //);
  
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
    
  /*  static defaultProps = {
      //Emails to be displayed on the Email List
      emails : [
        {
          id: 0,
          labelId: 1,
          from: 'zahra dehghanpour ',
          subject: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          time: "11:15"
        },
        {
          id: 1,
          labelId: 1,
          from: 'pouyeh banijamali ',
          subject: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          time: "22:08"
        },
        {
          id: 2,
          labelId: 1,
          from: 'zeynab sobhani',
          subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          time: "19:12"
        },
        {
          id: 3,
          labelId: 1,
          from: 'shaghyegh tavakoli',
          subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          time: "18:35"
        },
        {
          id: 4,
          labelId: 2,
          from: 'Emily Iverson',
          subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          time: "14:05"
        },
        {
          id: 5,
          labelId: 3,
          from: 'Michael Neal',
          subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          time: "14:05"
        }
      ]
    };*/
  
    render() {
     // console.log(this.props.emails[0].labelId);
     // const filteredEmails = this.props.emails.filter(e => e.labelId & e.labelId == this.state.selectedLabel);
      
     let content = null;
    //  if(filteredEmails.length > 0){
         content = <EmailList />;
  //    } else {
   //      content = <EmptyBox />;
  //    }
      
      return (
        <div className="container">
          <ActionsRow />
          <hr />
          <div className="row">
            <div className="col-12 col-sm-12 col-md-3 col-lg-2">
              <EmailLabels onLabelClick={this.handleLabelClick.bind(this)} />
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
    
    render(){
      return (
      
        <div className="row"> 
          <div className="col-12 col-sm-12 col-md-3 col-lg-2">
            <a href="#" className="btn btn-danger btn-primary btn-block">
              <i className="fa fa-edit"></i> Compose
            </a>
          </div>
          <div className="col-12 col-sm-12 col-md-9 col-lg-10">
            <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
              <button type="button" className="btn btn-secondary">&nbsp;<i className="fa fa-refresh" aria-hidden="true"></i>&nbsp;</button>
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
    } 
  }
  

export default App;
