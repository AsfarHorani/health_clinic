const User = require('../models/user');
const Appt = require('../models/appointment');
const Treatment = require('../models/treatment');

exports.getActiveDoctors=(req,res,next)=>{
    
    User.find({type: "doctor"})
    .then(doctors=>{
      console.log(doctors)
        if (!doctors)
        {
            const error = new Error("No doctor is active");
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({
            doctors: doctors,
            message: "Get all doctors success!",
  })


    })
  .catch(err=>{     
    console.log(err)
 if (!err.statusCode) {
     err.statusCode = 500;
   }
   next(err);
})
}

exports.postAppointment=(req,res,next)=>{
  const userId = req.body.userId;
  const docId= req.body.docId;
  const date = req.body.date;
  const time = req.body.time;
  console.log(req.body)
  const appt = new Appt({
    userId: userId,
    doctId : docId,
    date: date,
    time: time
  })

   return appt.save()
   .then(appointment=>{
    console.log(appointment)
    res.status(200).json({
        message:'post appointment successful',
        appointment: appointment
    })
   })
   .catch(err=>{
    console.log(err)
    if (!err.statusCode) {
       err.statusCode = 500;
     }
     next(err);
   })
  
  


}

exports.getMyAppointments=(req,res,next)=>{
   const qUserId = req.params.userId;
   console.log(req.query)
   const query = req.query.type=='patient'? {  userId: qUserId} : {  doctId: qUserId};
   console.log(query)
   Appt.find(query).then(appts=>{
 
    if (!appts)
    {
        const error = new Error("coulnt find appointments");
        error.statusCode = 401;
        throw error;
    }
    console.log(appts)
    res.status(200).json({
      appointments: appts,
      message: "Get all appointments success!",
})

   })  .catch(err=>{     
    console.log(err)
 if (!err.statusCode) {
     err.statusCode = 500;
   }
   next(err);
})
}


exports.postTreatment=(req,res,next)=>{
  const appId = req.body.apptId;
  const trt = req.body.treatment;
  console.log(appId, trt)
  const treatment = new Treatment({
    appointmentId : appId,
    treatment: trt
  })

return  treatment.save()
.then(resp=>{
  console.log(resp)
  res.status(200).json({
    message:'post treatment successful',
    treatment: resp
})
})
.catch(err=>{
  console.log(err)
  if (!err.statusCode) {
     err.statusCode = 500;
   }
   next(err);
 })
}

exports.getMyPrescriptions=(req,res,next)=>{
  const qUserId = req.params.userId;
  console.log(req.query)
  const query = req.query.type=='patient'? {  userId: qUserId} : {  doctId: qUserId};
  console.log(query)
  Appt.find(query).then(appts=>{

   if (!appts)
   {
       const error = new Error("coulnt find appointments");
       error.statusCode = 401;
       throw error;
   }
   let apptArray=[]
   appts.forEach(a=>{
     console.log(a)
     apptArray.push(a._id)
   })
 
   Treatment.find({
     appointment :{$in: apptArray}
   }).then(trts=>{
     console.log(trts)
     res.status(200).json({
      prescriptions: trts,
      message: "Get all prescriptions success!",
})
   })
  
  })  .catch(err=>{     
   console.log(err)
if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
})
}




