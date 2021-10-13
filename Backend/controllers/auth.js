const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


exports.signup = (req,res,next)=>{
    console.log(req.body)
     const email = req.body.email;
     const password = req.body.password;
     const type = req.body.type;
   
     bcrypt.hash(password,12)
     .then(hashedPassword=>{
         const user = new User({
             email: email,
             password: hashedPassword,
             type: type,
             status: false
         })
         return user.save()
     })
     .then((user)=>{
        console.log(user)
        res.status(200).json({
            message:'Sign up successful',
            user: user
        })
     }).catch(err=>{
         console.log(err)
         if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
     })

}

exports.login=(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
   User.findOne({email:email})
   .then((user)=>{
       console.log(user)
       if (!user)
       {
           const error = new Error("user doesn't exists");
           error.statusCode = 401;
           throw error;
       }
      
       loadedUser = user;

       return bcrypt.compare(password , user.password)

   }).then(doMatch=>{
       if(!doMatch)
       {
        const error = new Error("Password is incorrect");
        error.statusCode = 403;
        throw error;

       }
       let token=null;
       if(loadedUser.type==='patient')
       {
         token = jwt.sign({
            email: loadedUser .email,
            status: loadedUser .status,
          },'patient', {expiresIn: '1h'})

       } else if(loadedUser.type==='doctor')
       {
        token = jwt.sign({
            email: loadedUser .email,
            status: loadedUser .status
          },'doctor', {expiresIn: '1h'})

       } else if(loadedUser.type==='admin')
       {
        token = jwt.sign({
            email: loadedUser .email,
            status: loadedUser .status
          },'admin', {expiresIn: '1h'})

       }
       


   res.status(200).json({
       token: token,
       message: "login success",
       email: loadedUser .email,
       userType: loadedUser.type
   })
 
   })  .catch(err=>{     
    console.log(err)
 if (!err.statusCode) {
     err.statusCode = 500;
   }
   next(err);
})

}