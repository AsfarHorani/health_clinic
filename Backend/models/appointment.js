const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({

    userId:{
       
          req: true,
          type: String, 
      
    },
    doctId: {
      
        req: true,
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    status:{
            type: String,
            req: true,
            default: "pending"
    },
    date: {
        type: Date,
        req: true
    },
    time: {
        type: String,
        req: true
    }
})

module.exports= mongoose.model('Appointment', appointmentSchema)