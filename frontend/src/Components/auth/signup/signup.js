import React from 'react';
import Auth from '../auth';


const Signup=(props)=>{


    let type,email,password;
    const inputChangedHandler = (event,identifier)=>{
        if(identifier==='type')
        {
            type= event.target.value;
        
        }
        if(identifier==='email')
        {
            email = event.target.value
           
        }
       
        if(identifier==='password')
        {
             password = event.target.value
           
        }
        console.log(email,type,password)
   
    }

const clickedHandler=(em,na,pa)=>{
  const data={
      email: em,
      type: na,
      password: pa
  }
  
  console.log(data)
 props.clickSignUp(data)
  
}



return( 
<Auth>
        
        <h2>Signup</h2>


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

<select value={type}  onChange={(event)=>inputChangedHandler(event,'type')}>
                <option value="Empty" >Select Category</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
               
             </select>



        <button className="Btn" onClick={()=>clickedHandler(email,type,password)}>Signup</button>
     
        
    </Auth>
)

}


export default Signup