const User = require('../models/user');


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


