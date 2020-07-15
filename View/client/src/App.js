import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BootstrapTable, TableHeaderColumn }
  from 'react-bootstrap-table'
import axios from 'axios';
import Frame from 'react-frame-component';
import SunEditor, { buttonList } from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';


// global variable of login info
var loginInfo = {
  email: "",
  password: "",
  token: "",
}

// base class of UI
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  handleUpdateMe() {
    this.props.onClick();
  }
  logout(e) {
    loginInfo.token = ""
    this.forceUpdate()
  }
  login() {
    this.callApi()

      .then(response => {
        if (response.success) {
          loginInfo.token = response.token;
          console.log('loginIngo', JSON.stringify(loginInfo))
          this.forceUpdate();
        }
        else {
          alert('wrong password');
          loginInfo.email = ""
          loginInfo.password = ""
          this.forceUpdate()
          window.location.reload(false);

        }


      })
      .catch(err => {
        console.log('injaaaaayiiim')

      }
      )


  }
  // call login api
  callApi = async () => {
    console.log("injaaaaaaa :" + loginInfo.email)
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ "email": loginInfo.email, "password": loginInfo.password })
    };
    console.log('hiii-zahraaaaaaaaaaaaaaa')
    const response = await fetch('http://192.168.112.251:5001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "email": loginInfo.email, "password": loginInfo.password })
    })

    console.log('response' + response)
    const body = await response.json();

    console.log(body)
    return body;
  };
  updateMe() {
    console.log('updating meeee')
    this.forceUpdate();
  }

  render() {
    if (loginInfo.token != "") {
      return (
        <div>
          <NavBar title="Email Manager" user={loginInfo.email} />
          <MainContainer logout={e => this.logout(e)} />
        </div>
      )
    } else {
      return (
        <div>
          <NavBar title="Email Manager" user={loginInfo.email} />
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
// class related to login
class Login extends React.Component {
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
        <h3>Awesome Email Manager</h3>
        <div className="form-group">
          <label>Email address</label>

          <input type="text" className="form-control col-xs-4" placeholder="Enter email"
            onChange={e => loginInfo.email = e.target.value} />
        </div>
        <div className="form-group">
          <label>Password</label>

          <input type="password" className="form-control" placeholder="Enter password"
            onChange={e => loginInfo.password = e.target.value} />
        </div>
        <button type="button" className="btn btn-info btn-block more" onClick={this.handleSubmitClick.bind(this)}>Submit</button>
      </form>

    );
  }
}

// navigation bar class
class NavBar extends React.Component {

  render() {

    return (
      <div class="pos-f-t">
        <div class="collapse" id="navbarToggleExternalContent">
          <div class="bg-dark p-4">
            <h4 class="text-white">Collapsed content</h4>
            <span class="text-muted">Toggleable via the navbar brand.</span>
          </div>
        </div>
        <nav class="navbar navbar-dark bg-dark">

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <nav class="navbar navbar-dark indigo">
            <span class="navbar-text white-text">
              {loginInfo.email}
            </span>
          </nav>
        </nav>
      </div>

    )
  }
}

// labels is managed by this class
class EmailLabels extends React.Component {



  componentDidMount() {

    this.callApi()

      .then(res => this.setState({ numberOfUnSeen: res.inbox }))
      .catch(err => console.log(err));


  }
  callApi = async () => {
    console.log("injaaaaaaa :")
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFwIjp7InVzZXIiOiJ0ZXN0LmRlaGdoYW5wb3VyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiemFocmEyMjU1NDQ0MCIsImhvc3QiOiJpbWFwLmdtYWlsLmNvbSIsInBvcnQiOjk5MywidGxzIjp0cnVlLCJhdXRoVGltZW91dCI6OTAwMH0sImlhdCI6MTU5NDYyNjQ0M30.zqUnpSpAkw8VvgGrHD-2PU2Dt540mVXBWIt62SyCBLE'
      },

    };
    console.log('hiii-zahra')
    const response = await fetch('http://192.168.112.251:5001/api/receive/numberOf/emails', requestOptions)

    const body = await response.json();

    console.log(body)
    this.state.myBoolean = false;
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  static defaultProps = {

    labels: [{
      id: 1,
      name: 'Inbox',
      emailNumber: 0
    }, {
      id: 2,
      name: 'Sent',
      emailNumber: 9
    }],
  }
  render() {
    console.log('hereeeee   2 ' + this.props.labels.name)
    return (
      <ul className="list-group">

        <LabelItem />
      </ul>
    )
  }
}

// sent and inbox label managed by this class
class LabelItem extends React.Component {

  state = {

    numberOfUnAll: '',
    numberOfSent: '',
    clickedInbox: true,
    clickedSent: false
  }
  labels = {

    labels: [{
      id: 1,
      name: 'Inbox',
      emailNumber: 0
    }, {
      id: 2,
      name: 'Sent',
      emailNumber: 9
    }],
  }
  componentDidMount() {

    this.callApi()

      .then(res => this.setState({ numberOfUnAll: res.inbox, numberOfSent: res.sent }))
      .catch(err => console.log(err));

  }
  callApi = async () => {
    console.log("injaaaaaaa :")
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFwIjp7InVzZXIiOiJ0ZXN0LmRlaGdoYW5wb3VyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiemFocmEyMjU1NDQ0MCIsImhvc3QiOiJpbWFwLmdtYWlsLmNvbSIsInBvcnQiOjk5MywidGxzIjp0cnVlLCJhdXRoVGltZW91dCI6OTAwMH0sImlhdCI6MTU5NDYyNjQ0M30.zqUnpSpAkw8VvgGrHD-2PU2Dt540mVXBWIt62SyCBLE'
      },

    };
    console.log('hiii-zahra')
    const response = await fetch('http://192.168.112.251:5001/api/receive/numberOf/emails', requestOptions)

    const body = await response.json();

    console.log(body)
    this.state.myBoolean = false;
    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  handleClick() {
    console.log('handleClick ' + this.props.id);
    this.props.onClick(this.props.id);
  }
  inboxClicked(e) {
    e.preventDefault()
    this.callApi()

      .then(res => this.setState({ numberOfUnAll: res.inbox, numberOfSent: res.sent }))
      .catch(err => console.log(err));

    this.state.clickedInbox = true
    this.forceUpdate()
    this.state.clickedSent = false

  }
  sentClicked(e) {
    e.preventDefault()
    this.callApi()

      .then(res => this.setState({ numberOfUnAll: res.inbox, numberOfSent: res.sent }))
      .catch(err => console.log(err));

    this.state.clickedSent = true
    this.forceUpdate()
    this.state.clickedInbox = false;

  }
  updateUnseen(e) {

    console.log('dre updateeee mikoneeeee')
    this.callApi()

      .then(res => {
        this.setState({ numberOfUnAll: res.inbox, numberOfSent: res.sent })
        this.state.clickedInbox = true
      })
      .catch(err => console.log(err));
    console.log("tedade jdid " + this.state.numberOfUnAll)
    this.forceUpdate()
  }
  render() {

    if (!this.state.clickedInbox && !this.state.clickedSent) {
      console.log('11111')

      return (

        <div>
          <button type="button" class="btn btn-primary" onClick={e => this.inboxClicked(e)}>
            Inbox <span class="badge badge-danger ml-3"> {this.state.numberOfUnAll}</span>
          </button>
          <button type="button" class="btn btn-primary" onClick={e => this.sentClicked(e)}>
            Sent <span class="badge badge-danger ml-3"> {this.state.numberOfSent}</span>
          </button>

        </div>
      );
    }
    else if (this.state.clickedInbox) {


      {
        console.log('222222')
        this.callApi()

          .then(res => this.setState({ numberOfUnAll: res.inbox, numberOfSent: res.sent }))
          .catch(err => console.log(err));

        return (

          <div>
            <div>
              <div className="container">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-3 col-lg-2">

                    <div>
                      <button type="button" class="btn btn-mdb-color form-check-label" onClick={e => this.inboxClicked(e)}>
                        Inbox <span class="badge badge-danger ml-3"> {this.state.numberOfUnAll}</span>
                      </button>
                      <p>


                      </p>
                      <button type="button" class="btn btn-mdb-color form-check-label" onClick={e => this.sentClicked(e)}>
                        Sent  <span class="badge badge-danger ml-3"> {this.state.numberOfSent} </span>
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-9 col-lg-10">
                    <EmailList update={e => this.updateUnseen(e)} />
                  </div>
                </div>
              </div>


            </div>
          </div>
        );

      }
    }
    else if (this.state.clickedSent) {
      this.callApi()

        .then(res => this.setState({ numberOfUnAll: res.inbox, numberOfSent: res.sent }))
        .catch(err => console.log(err));

      {

        console.log('33333')
        return (
          <div>
            <div>
              <div className="container">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-3 col-lg-2">

                    <div>
                      <button type="button" class="btn btn-mdb-color form-check-label" onClick={e => this.inboxClicked(e)}>
                        Inbox <span class="badge badge-danger ml-3"> {this.state.numberOfUnAll}</span>
                      </button>
                      <p>


                      </p>
                      <button type="button" class="btn btn-mdb-color form-check-label" onClick={e => this.sentClicked(e)}>
                        Sent <span class="badge badge-danger ml-3"> {this.state.numberOfSent}</span>
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-9 col-lg-10">
                    <SentItem />
                  </div>
                </div>
              </div>


            </div>
          </div>
        );
      }
    }
  }
}


class EmailList extends React.Component {

  state = {
    inbox: 1,
    sent: 0
  }
  handleEmailClick = (id) => {
    alert('Clicked' + id);
    console.log("hhhh");
  };
  showInbox() {
    this.setState.inbox = 1
    this.forceUpdate();
  }
  showSent() {
    this.setState.inbox = 0
    this.setState.sent = 1
    this.forceUpdate()
  }
  render() {
    if (this.state.inbox == 1) {
      return (

        <div>


          <p>


          </p>
          <EmailItem update={e => this.props.update(e)} />


        </div>
      )
    }
    else {
      return (

        <div>
        </div>
      )
    }
  }
}

// inbox emails is listed here
class EmailItem extends React.Component {



  myBoolean = false;
  state = {
    emails: []
  }
  selectedEmail = {
    text: '',
    subject: '',
    date: '',
    from: '',
    id: '',
    status: ''
  }
  deleted = false

  componentDidMount() {

    this.callApi()
      // 
      .then(res => {
        this.setState({ emails: res.emails })
        console.log('hiii' + this.state.emails[0].subject)
      })
      .catch(err => console.log(err));


  }
  callApi = async () => {
    console.log("inja :" + this.myBoolean)
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFwIjp7InVzZXIiOiJ0ZXN0LmRlaGdoYW5wb3VyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiemFocmEyMjU1NDQ0MCIsImhvc3QiOiJpbWFwLmdtYWlsLmNvbSIsInBvcnQiOjk5MywidGxzIjp0cnVlLCJhdXRoVGltZW91dCI6OTAwMH0sImlhdCI6MTU5NDYyNjQ0M30.zqUnpSpAkw8VvgGrHD-2PU2Dt540mVXBWIt62SyCBLE'
      },

    };
    console.log('hiii-zahra')
    const response = await fetch('http://192.168.112.251:5001/api/receive/emails', requestOptions)

    const body = await response.json();

    console.log(body)
    this.state.myBoolean = false;
    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  handleLabelClick(labelId) {
    console.log(this.state.myBoolean);
    console.log('Label clicked: ' + labelId);
    console.log('pydat krdm')
  }
  alertClicked(email, e) {
    e.preventDefault();
    this.selectedEmail.date = email.date
    this.selectedEmail.text = email.text
    this.selectedEmail.id = email.uid
    this.selectedEmail.status = email.status
    this.selectedEmail.from = email.from
    this.selectedEmail.subject = email.subject
    this.myBoolean = true;
    this.forceUpdate();

  }
  backClicked(e, id) {
    e.preventDefault();

    this.myBoolean = false;
    if (this.selectedEmail.status == 'UNSEEN') {
      fetch('http://192.168.112.251:5001/api/mark/seen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFwIjp7InVzZXIiOiJ0ZXN0LmRlaGdoYW5wb3VyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiemFocmEyMjU1NDQ0MCIsImhvc3QiOiJpbWFwLmdtYWlsLmNvbSIsInBvcnQiOjk5MywidGxzIjp0cnVlLCJhdXRoVGltZW91dCI6OTAwMH0sImlhdCI6MTU5NDYyNjQ0M30.zqUnpSpAkw8VvgGrHD-2PU2Dt540mVXBWIt62SyCBLE'
        },
        body: JSON.stringify({ uid: id })
      }).then(response => {
        if (response.ok) {
          response.json().then(async json => {
            console.log("ID:" + id)
            console.log('now:')
            console.log(json);
            await this.callApi()
              .then(res => {
                this.setState({ emails: res.emails })
                console.log('hiii' + this.state.emails[0].subject)
                this.forceUpdate()
              })
              .catch(err => console.log(err))



          });
        }
      })


    }
    this.props.update();
    this.forceUpdate();
  }
  handleEmailClick() {


    this.props.handleEmailClick(this.props.email.id);
    console.log("i am zahra");
  }
  markUnseen = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${loginInfo.token}'
      },
      body: JSON.stringify({ title: 'React POST Request Example' })
    };
    console.log('hiii-zahra')
    const response = await fetch('http://localhost:5001/api/mark/seen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFwIjp7InVzZXIiOiJ0ZXN0LmRlaGdoYW5wb3VyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiemFocmEyMjU1NDQ0MCIsImhvc3QiOiJpbWFwLmdtYWlsLmNvbSIsInBvcnQiOjk5MywidGxzIjp0cnVlLCJhdXRoVGltZW91dCI6OTAwMH0sImlhdCI6MTU5NDYyNjQ0M30.zqUnpSpAkw8VvgGrHD-2PU2Dt540mVXBWIt62SyCBLE'
      },
      body: JSON.stringify({ "uid": this.selectedEmail.id })
    })

    const body = await response.json();

    console.log(body)
    this.state.myBoolean = false;
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  callSeenApi() {
    this.callSeenApi()

      .then(
        console.log('mark seeen')
      )
      .catch(err => console.log(err));


  }
  delete(e, id) {
    console.log("id:" + id)
    e.preventDefault();
    fetch('http://192.168.112.251:5001/api/delete/emails', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFwIjp7InVzZXIiOiJ0ZXN0LmRlaGdoYW5wb3VyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiemFocmEyMjU1NDQ0MCIsImhvc3QiOiJpbWFwLmdtYWlsLmNvbSIsInBvcnQiOjk5MywidGxzIjp0cnVlLCJhdXRoVGltZW91dCI6OTAwMH0sImlhdCI6MTU5NDYyNjQ0M30.zqUnpSpAkw8VvgGrHD-2PU2Dt540mVXBWIt62SyCBLE'
      },
      body: JSON.stringify({ uid: id })
    }).then(response => {
      if (response.ok) {
        response.json().then(async json => {

          console.log('now:')
          console.log(json);
          this.deleted = true
          await this.callApi()
            .then(res => {
              this.setState({ emails: res.emails })
              console.log('hiii' + this.state.emails[0].subject)
            })
            .catch(err => console.log(err))
          this.forceUpdate()


        });
      }
    })
  }

  render() {
    console.log('hii' + this.myBoolean)
    if (!this.myBoolean || this.deleted) {

      return (
        <div>
          {this.state.emails.map(email => (
            <div>
              {email.booleanStatus ? (

                <div>
                  <li className="list-group-item list-group-item-action flex-column align-items-start" onClick={e => this.alertClicked(email, e)}>


                    <div class="d-flex w-100 justify-content-between">
                      <h7 class="mb-1 text-muted">{email.subject}
                      </h7>
                      <span className="ml-auto p-2">
                        <span className="badge badge-default badge-pill">{email.date}</span>
                      </span>
                    </div>
                    <p> <small class="text-muted">{email.from}</small> </p>


                  </li>
                </div>
              ) : (

                  <div>
                    <li className="list-group-item list-group-item-action flex-column align-items-start " onClick={e => this.alertClicked(email, e)}>


                      <div class="d-flex w-100 justify-content-between">
                        <h7 class="mb-1" ><strong>{email.subject}</strong>
                        </h7>
                        <span className="ml-auto p-2">
                          <span className="badge badge-default badge-pill">{email.date}</span>
                        </span>
                      </div>
                      <p> <small class="mb-1"> <strong>{email.from}</strong>  </small> </p>

                    </li>
                  </div>
                )}
            </div>

          ))}
        </div>
      );
    }
    else if (this.myBoolean || !this.delete) {
      return (

        <div class="list-group" >

          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start"  >
            <div class="d-flex w-100 justify-content-between">

              <small class="text-muted">{this.selectedEmail.date}</small>
            </div>
            <p class="mb-1">Subject : {this.selectedEmail.subject}</p>
            <p>



            </p>
            <p class="mb-1">From : {this.selectedEmail.from} </p>
            <p>

            </p>
            <p class="mb-1">Text : {this.selectedEmail.text} </p>
          </a>


          <p></p>  <p></p>

          <button type="submit" className="btn-primary btn-block" onClick={e => this.backClicked(e, this.selectedEmail.id)} style={{ height: 40, width: 70 }}>
            Back</button>
          <button type="submit" className="btn btn-danger more" onClick={e => this.delete(e, this.selectedEmail.id)} style={{ height: 40, width: 70 }}>
            Delete</button>

        </div>
      );
    }





  }
}
//sent emails shows here
class SentItem extends React.Component {
  myBoolean = false;
  deleted = false;
  state = {
    emails: []
  }
  selectedEmail = {
    text: '',
    subject: '',
    date: '',
    to: ''
  }

  componentDidMount() {

    this.callApi()
      .then(res => {
        this.setState({ emails: res.emails })
        console.log('hiii' + this.state.emails[0].subject)
      })
      .catch(err => console.log(err));



  }
  callApi = async () => {
    console.log("inja :" + this.myBoolean)
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFwIjp7InVzZXIiOiJ0ZXN0LmRlaGdoYW5wb3VyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiemFocmEyMjU1NDQ0MCIsImhvc3QiOiJpbWFwLmdtYWlsLmNvbSIsInBvcnQiOjk5MywidGxzIjp0cnVlLCJhdXRoVGltZW91dCI6OTAwMH0sImlhdCI6MTU5NDYyNjQ0M30.zqUnpSpAkw8VvgGrHD-2PU2Dt540mVXBWIt62SyCBLE'
      },

    };
    console.log('hiii-zahra')
    const response = await fetch('http://192.168.112.251:5001/api/receive/sent/emails', requestOptions)
    const body = await response.json();

    console.log(body)
    this.state.myBoolean = false;
    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  alertClicked(email, e) {
    e.preventDefault();
    this.selectedEmail.date = email.date
    this.selectedEmail.text = email.text
    this.selectedEmail.to = email.from
    this.selectedEmail.subject = email.subject
    this.myBoolean = true;
    this.forceUpdate();

  }

  backClicked(e) {
    e.preventDefault();

    this.myBoolean = false;
    this.forceUpdate();
  }
  render() {


    if (!this.myBoolean) {
      return (
        <div>
          {this.state.emails.map(email => (
            <div>
              <li className="list-group-item list-group-item-action flex-column align-items-start" onClick={e => this.alertClicked(email, e)}>


                <div class="d-flex w-100 justify-content-between">
                  <h7 class="mb-1">{email.subject}
                  </h7>
                  <span className="ml-auto p-2">
                    <span className="badge badge-default badge-pill">{email.date}</span>
                  </span>
                </div>
                <p> <small class="text-muted">{email.to}</small> </p>


              </li>
            </div>


          ))}
        </div>
      );
    }
    else if (this.myBoolean) {

      return (

        <div class="list-group" >

          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start"  >
            <div class="d-flex w-100 justify-content-between">
              <small class="text-muted">{this.selectedEmail.date}</small>
            </div>
            <p class="mb-1">Subject : {this.selectedEmail.subject} </p>
            <p>



            </p>
            <p class="mb-1">To : {this.selectedEmail.to} </p>
            <p>


            </p>
            <p class="mb-1">Text : {this.selectedEmail.text} </p>
          </a>

          <p></p>  <p></p>

          <h><button type="submit" className="btn-primary btn-block" style={{ height: 40, width: 70 }}
            onClick={e => this.backClicked(e)}>Back</button></h>


        </div>
      );

    }

  }
}

// when the mailbox is empty 
class EmptyBox extends React.Component {

  render() {
    return (
      <p className="center">The email box is empty {this.props.id}</p>
    )
  }
}



/**
 * Main class which contains the labels and the email list.
 */
class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedLabel: 1
    }
  }
  update(e, clickedLogout) {
    if (!clickedLogout) {
      e.preventDefault()
      alert('successfully send')

      this.forceUpdate()
    }
    else {
      this.props.logout(e)
    }
  }
  handleLabelClick(labelId) {
    console.log('Label clicked: ' + labelId);
    console.log('pydat krdm')
    this.setState({
      selectedLabel: labelId
    });
  }



  render() {




    return (
      <div className="container">

        <ActionsRow updateScreen={e => this.update(e)} />
        <hr />


        <LabelItem />
      </div>
    )
  }
}

/**
 * Come options for showing how to emulate Gmail using Bootsrap 4.
 */
class ActionsRow extends React.Component {

  clicked = false
  clickedLogOut = false

  handleComposeClick(state, e) {
    e.preventDefault()
    this.clicked = true
    this.forceUpdate()
    console.log("hereeeee pouyeh")
  }
  handleLogOutclicked(e) {
    // e.preventDefault()
    console.log('logggg out')
    window.location.reload(false);



  }
  render() {
    console.log('bbinm chie' + this.clicked)

    if (!this.clicked) {
      return (


        <div className="row">
          <div className="col-12 col-sm-12 col-md-3 col-lg-2">
            <a href="#" className="btn btn-danger btn-primary btn-block"
              onClick={e => this.handleComposeClick(this.state, e)}>
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


            </div>

            <div className="pull-right">
              <div className="btn-group" role="group">
                <button type="button" class="btn btn-danger" onclick={e => this.handleLogOutclicked(e)}>Log out</button>

              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <ComposeMail update={e => this.props.updateScreen(e, false)} />
      )
    }
  }
}
// this class is manage sending email
class ComposeMail extends React.Component {

  state = {
    email: {
      to: [],
      subject: '',
      text: ''
    },
    success: false
  }

  setTos(state, e) {
    state.email.to = []
    state.email.to = e.target.value.split(",")

  }
  sendEmail(state, e) {
    e.preventDefault();
    console.log("okkkkk")
    console.log(state);
    fetch('http://192.168.112.251:5001/api/send/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFwIjp7InVzZXIiOiJ0ZXN0LmRlaGdoYW5wb3VyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiemFocmEyMjU1NDQ0MCIsImhvc3QiOiJpbWFwLmdtYWlsLmNvbSIsInBvcnQiOjk5MywidGxzIjp0cnVlLCJhdXRoVGltZW91dCI6OTAwMH0sImlhdCI6MTU5NDYyNjQ0M30.zqUnpSpAkw8VvgGrHD-2PU2Dt540mVXBWIt62SyCBLE'
      },
      body: JSON.stringify(state.email)
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json);

          console.log('now:')
          console.log(state)
          this.state.success = true
          alert('successfully sent :)')
          this.forceUpdate()
        });

      }
      else {
        alert('try again')
      }
    })


  }
  cancleEmail(state, e) {
    this.state.success = true;
    this.forceUpdate()
  }
  render() {
    if (!this.state.success) {
      return (
        <p class="compose">
          <div>
            <p>
              <h>To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h>
              <input type="text" style={{ width: "380px", fontSize: 15 }} onChange={e => this.setTos(this.state, e)} />
            </p>

            <p>
              <span>Subject&nbsp;&nbsp;</span>
              <input type="text" style={{ width: "380px", fontSize: 15 }} onChange={e => this.state.email.subject = e.target.value} />
            </p>
            <p>
              <h> Email </h>
              <SunEditor width="100%" height="100%" onChange={e => this.state.email.text = e} />
            </p>
            <button type="submit" className="btn btn-primary btn-block" style={{ height: 50, width: 70 }}
              onClick={e => this.sendEmail(this.state, e)}>Send</button>
            <button type="submit" className="btn btn-danger btn-block" style={{ height: 50, width: 70 }}
              onClick={e => this.cancleEmail(this.state, e)}>cancle</button>


          </div>
        </p>
      )
    } else {
      return (
        <div>

          <ActionsRow />
          {e => this.props.update(e)}
        </div>
      )
    }
  }
}


export default App;