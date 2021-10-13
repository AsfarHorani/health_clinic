const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({

    userId:{
          type: String ,
          req: true,
          ref: user
    },
    doctorsId: {
        type: String ,
        req: true,
        ref: user
    },
    status:{
            type: String,
            req: true,
            default: pending
    }
})

module.exports= mongoose.model('User', userSchema)