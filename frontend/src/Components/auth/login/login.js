import React from 'react';
import Auth from '../auth';


const Login=(props)=>{

    let email,password;
    const inputChangedHandler = (event,identifier)=>{
      
        if(identifier==='email')
        {
            email = event.target.value
           
        }
       
        if(identifier==='password')
        {
             password = event.target.value
           
        }
        console.log(email ,password)
   
    }

const clickedHandler=(em,pa)=>{
  const data={
      email: em,
   
      password: pa
  }
  
  console.log(data)
 props.clickLogin(data)
  
}



return( 
<Auth>
        
        <h2>Login</h2>


    <input 
        id = 'email'
        onChange={(event)=>inputChangedHandler(event,'email')} 
        type='email' 
        placeholder='Your Email'
       />
 
    <input 
        id = 'password'
        onChange={(event)=>inputChangedHandler(event,'password')} 
        type='password' 
        placeholder='Your Password'/>



        <button className="Btn" onClick={()=>clickedHandler(email,password)}>Login</button>
     
        
    </Auth>
)

}


export default Login;