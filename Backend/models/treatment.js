const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const treatmentSchema = new Schema({

    appointmentId:{
        req: true,
        type: Schema.Types.ObjectId, 
        ref: 'Appointment' 
      
    },
    
    status:{
            type: String,
            req: true,
         
    },
  
})

module.exports= mongoose.model('Treatment', treatmentSchema)