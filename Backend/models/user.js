const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  
    email: {
        type: String,
        req: true
    },
    password:{
        type: String,
        req: true
       
    },
    type:{
        type: String,
        req: true
    },
    status:{
            type: Boolean,
            req: true
            
    }
   
    

})

module.exports= mongoose.model('User', userSchema)