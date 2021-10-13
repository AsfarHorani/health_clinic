import './App.css';
import { Component , Fragment} from 'react';
import React from 'react';
import Signup from './Components/auth/signup/signup';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Components/auth/login/login';
import Body from './body/body';
import Backdrop from './Components/UI/backDrop/Backdrop';
import Modal from './Components/UI/Modal/Modal';

class App extends Component {

  state={
    type:null,
    token: null,
    isAuth: false,
    emailId: null,
    showBackdrop: false,
    message:{
      type: "token",
      title: "Enter token",
      content: ""

    },
    docId: null,
    patientId: null

  }


  componentDidMount(){
    console.log('Component did mount, [app]')
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if(!token || !expiryDate)
    {
     
      return
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
  
  const emailId = localStorage.getItem('emailId');
  const userType = localStorage.getItem('userType');
  const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
  this.setState({ isAuth: true, token: token, emailId: emailId , type: userType });
  this.setAutoLogout(remainingMilliseconds);
  }

  signupHandler=(data)=>{
    console.log(data);
     fetch("http://localhost:8080/signup",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
  
        email: data.email,
        password: data.password,
        type: data.type
  
      })
    }
     ).then(res=>{
      if(res.status!==200 && res.status!==201)
      {
        throw new Error('create admin failed')
      
      }
      return res.json();
     }).then(resData=>{
       console.log(resData);

     }).catch(err=>{
       console.log(err)
     })
  }

  loginHandler=(data)=>{
    console.log(data);
     fetch("http://localhost:8080/login",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
  
        email: data.email,
        password: data.password,

  
      })
    }
     ).then(res=>{
      if(res.status!==200 && res.status!==201)
      {
        throw new Error('login user failed')
      
      }
      return res.json();
     }).then(resData=>{
       console.log(resData);
      localStorage.setItem('token',resData.token);
      localStorage.setItem('emailId', resData.email);
      localStorage.setItem('userType', resData.userType);

      
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(
      new Date().getTime() + remainingMilliseconds
    );
    localStorage.setItem('expiryDate', expiryDate.toISOString());
      
      this.setState({token: resData.token, emailId : resData.email, isAuth: true, type: resData.userType})
      this.setAutoLogout(remainingMilliseconds);
    console.log('success')
    this.props.history.push('/')
     }).catch(err=>{
       console.log(err)
     })
  }


  logoutHandler=()=>{
    this.setState({isAuth: false, token: null})
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('emailId');
    console.log('Loggedout')
    this.props.history.push('/login')
  }
  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };


  setAppointmenthandler=(time,date)=>{
    console.log(time,date)
    fetch("http://localhost:8080/postAppointment",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
  
        time: time,
        data: date,
        docId: this.state.docId,
        patientId: this.state.patientId
  
      })
    }
     ).then(res=>{
      if(res.status!==200 && res.status!==201)
      {
        throw new Error('login user failed')
      
      }
      return res.json();
     }).then(resData=>{
       console.log(resData)
      this.setState({showBackdrop: false, message: null, docId: null, patientId: null})
     }).catch(err=>{
       console.log(err)
     })
    
  }

  submitTokenHandler=(token)=>{
  
    this.setState({showBackdrop: false, message: null})
  }
 showMdoal=(m)=>{
   this.setState({showBackdrop: true, message: m})
 }
  render(){
  return (
    <div className="App">

<Fragment>
         {this.state.showBackdrop && (
          <Backdrop />
        )}
   {this.state.message && (<Backdrop  />)}
          {this.state.message && (
            <Modal
            type={this.state.type}
              title={this.state.message.title}
              message={this.state.message}
              onAcceptModal={ this.state.message.type==="token"?this.submitTokenHandler :this.setAppointmenthandler }
              acceptEnabled
            >
              <p>{this.state.message.content}</p>
            </Modal>
          )}
       

      <Router>
      <Switch>
       <Route path="/signup" exact render={()=><Signup clickSignUp={this.signupHandler}/>} /> 
       <Route path="/login" exact render={()=><Login clickLogin={this.loginHandler}/>} /> 
       <Route path="/" render={()=><Body showMdoal={this.showMdoal}/>} /> 
     </Switch>
     </Router>
   </Fragment>
    </div>
  );
  }
}

export default App;
