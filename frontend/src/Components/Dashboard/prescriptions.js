import React, { useEffect, useState } from 'react';

const Prescriptions=(props)=>{
    const [prescriptions, setPrescriptions]= useState([]);
    useEffect(()=>{
        console.log("component rerender.. [prescriptions]")
        fetch(`http://localhost:8080/getMyPrescriptions/${props.userId}`,{
            headers:{
                Authorization: 'Bearer ' + props.token
            }
        })
        .then(res=>{
            if(res.status!==200 && res.status!==201)
            {
              throw new Error('get prescriptions failed')
            
            }
            return res.json()
        }).then(resData=>{
           
            console.log(resData)
            setPrescriptions(resData.prescriptions)
        }).catch(err=>{
            console.log(err)
        })
    },[props.userId])
   




    return(<div></div> )
}

export default Prescriptions;