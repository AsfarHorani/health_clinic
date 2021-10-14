import React, { useEffect, useState } from 'react';
import './doctor.css'
const Appointments=(props)=>{
   const [appointments,setAppointments] = useState([]);

    useEffect(()=>{
        console.log("component rerender.. [Apoointment]")
        fetch(`http://localhost:8080/getMyAppointments/${props.userId}`)
        .then(res=>{
            if(res.status!==200 && res.status!==201)
            {
              throw new Error('get appointments failed')
            
            }
            return res.json()
        }).then(resData=>{
           console.log(resData)
            setAppointments(resData.appointments)
        }).catch(err=>{
            console.log(err)
        })
    },[props.userId])
    console.log(appointments)

   let appts= null
   if(appointments!==null && appointments.length>0){
    appts = appointments.map(appointment=>( <li key={appointment._id} className='doctor'>
       <h3>~
           Appointment ID - {appointment._id}
          
       </h3>
       <h3>~
           Doctors ID - {appointment.doctId}
          
       </h3>
       <p>
          Date - {appointment.date}
          Time - {appointment.time}
          
       </p>
    
    
       </li>
 
       )) 
   }

    return( <div className="doctors">{appts}</div> )
}

export default Appointments;