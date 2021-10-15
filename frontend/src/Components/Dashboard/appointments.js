import React, { useEffect, useState } from 'react';
import './doctor.css'
const Appointments=(props)=>{
   const [appointments,setAppointments] = useState([]);
   const[treatment,setTreatment]=useState(null);
console.log(props.userId)
    useEffect(()=>{

        console.log("component rerender.. [Apoointment]")
          fetch(`http://localhost:8080/getMyAppointments/${props.userId}?type=${props.type}`)
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

       
    },[props.userId,props.type])
    console.log(appointments)
    let appts= null




  const postTreatment=(aId)=>{
    console.log(treatment,aId)
    fetch(`http://localhost:8080/postTreatment`,{
        method: 'POST',
     
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + props.token
        },
        body: JSON.stringify({
          treatment: treatment,
          apptId : aId
        })
      }).then(res=>{
        if(res.status!==200 && res.status!==201)
        {
          throw new Error('post treatment failed')
        
        }
        return res.json();
       }).then(resData=>{
         console.log(resData)
         setTreatment(null);
      }).catch(err=>{
       console.log(err)
      })
    }


   if(appointments!==null && appointments.length>0 && props.type==='patient'){
    appts = appointments.map(appointment=>( <li key={appointment._id} className='doctor'>
       <h3>
           Appointment ID - {appointment._id}
          
       </h3>
       <h3>
           Doctors ID - {appointment.doctId}
          
       </h3>
       <p>
          Date - {appointment.date}
          Time - {appointment.time}
          
       </p>
       <h3>
           Status  - {appointment.status}
          
       </h3>
    
       </li>
 
       )) 
   }

  else if(appointments!==null && appointments.length>0 && props.type==='doctor'){
    appts = appointments.map(appointment=>( <li key={appointment._id} className='doctor'>
       <h3>
           Appointment ID - {appointment._id}
          
       </h3>
       <h3>
           Patient ID - {appointment.userId || null}
          
       </h3>
       <p>
          Date - {appointment.date}
          Time - {appointment.time}
          
       </p>
       <h3>
           Status  - {appointment.status}
          
       </h3>
       <textarea   onChange={(e)=>setTreatment(e.target.value)} className="textarea" placeholder="Write prescription here..." />
        <button className="Btn" onClick={()=>postTreatment(appointment._id)} >Send presciption</button>
       </li>
 
       )) 
   }


    return( <div className="doctors">{appts}</div> )
}

export default Appointments;