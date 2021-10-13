import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './doctor.css'
const Doctors=(props)=>{
   const [doctors,setDoctors] = useState([]);

    useEffect(()=>{
        console.log("component rerender.. [doctor]")
        fetch('http://localhost:8080/getActiveDoctors')
        .then(res=>{
            if(res.status!==200 && res.status!==201)
            {
              throw new Error('create admin failed')
            
            }
            return res.json()
        }).then(resData=>{
           
            setDoctors(resData.doctors)
        }).catch(err=>{
            console.log(err)
        })
    },[props])
    console.log(doctors)

   let docs = null
   if(doctors!==null && doctors.length>0){
       docs = doctors.map(doctor=>( <li key={doctor._id} className='doctor'>
       <h3>~
           ID - {doctor._id}
          
       </h3>
       <h3> Email: {doctor.email}</h3>
       <button className="Btn">Get appointment</button>
         
       </li>
 
       )) 
   }

    return( <div className="doctors">{docs}</div> )
}

export default Doctors;