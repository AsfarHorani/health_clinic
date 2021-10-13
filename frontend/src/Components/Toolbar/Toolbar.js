import React, {Fragment} from 'react'
import './toolbar.css';
import Navitem from './navItem/navItem';
const Toolbar = (props)=>{
 
    let navs = null;

    if(props.type==="patient")
    {

        navs = (

            <Fragment> 
            
            <Navitem 
            
            link= '/active-doctors'
               
            >
            Active Doctors        
           </Navitem>
           <Navitem 
            
             link= '/appointments'
               
            >
            Appointments     
           </Navitem>
           </Fragment>
            );
        
    }
 
    

 else if(props.type==="doctor"){
  navs = (

        <Fragment> 
        
        <Navitem 
        
        link= '/my-appointments'
           
        >
       My Appointments      
       </Navitem>
       <Navitem 
         
         link= '/my-prescriptions'
           
        >
        My prescriptions    
       </Navitem>
       </Fragment>
        ); 
  }


  return(<header className="Toolbar">
 
     {navs}
     
    
    
  </header>)
}


export default Toolbar;