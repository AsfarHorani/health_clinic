const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signp = (req,res,next)=>{
     const email = req.body.email;
     const password = req.body.password;
     const type = req.body.type;
     
     bcrypt.hash(password,12)
     .then(hashedPassword=>{
         const user = new User(email,hashedPassword,type);
         return user.save()
     })
     .then(([user])=>{
        console.log(user[0])
     }).catch(err=>{
         console.log(err)
     })

}


exports.login=(req,res,next)=>{

}