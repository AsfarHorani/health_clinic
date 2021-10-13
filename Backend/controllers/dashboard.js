const User = require('../models/user');
const Appt = require('../models/appointment');

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


