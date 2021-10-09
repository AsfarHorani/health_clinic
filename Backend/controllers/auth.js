const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
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
   User.findOne({email:email})
   .then((user)=>{
       if (!user)
       {
           const error = new Error("user doesn't exists");
           error.statusCode = 401;
           throw error;
       }
       let loadedUser;
       loadedUser = user;

       return bcrypt.compare(password , user.password)

   }).then(doMatch=>{
       if(!doMatch)
       {
        const error = new Error("Password is incorrect");
        error.statusCode = 403;
        throw error;

       }

       const token = jwt.sign({
           email: user.email,
           status: user.status
       })
   },'secret', {expiresIn: '1h'})


   res.status(200).json({
       token: token,
       message: "login success",
       email: user.email
   })
   .catch(err=>{     
       console.log(err)
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
   })
}