const express = require('express')
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const bodyParser = require('body-parser');
const dataBaseURL =`mongodb+srv://asfar:101021@cluster0.mnphf.mongodb.net/health-clinic`;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use(authRoutes);
app.use(dashboardRoutes);
app.use((error,req,res,next)=>{
    const status = error.statusCode || 500;
    const message = error.message || "Something went wrong";
   
    res.status(status).json({
        message: message
    })
}); 


mongoose.connect(dataBaseURL)
.then(res=>{
 
    app.listen(8080);
})
.catch(err=>{
    console.log(err)
})
