import './App.css';
import { Component } from 'react';
import React from 'react';
import Signup from './Components/auth/signup/signup';
class App extends Component {

  state={}

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


  render(){
  return (
    <div className="App">
     <Signup clickSignUp={this.signupHandler}/>
    </div>
  );
  }
}

export default App;
