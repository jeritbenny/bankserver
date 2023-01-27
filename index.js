//import express
const express = require('express')
//importing dataservice
const dataService = require('./services/data.service')
//import cors
const cors = require('cors')

//creating n application for express
const app = express()
//to parse json from req body
app.use(express.json())//type conversion
//give command to share data via cors
app.use(cors({
    orgin:'http://localhost:4200'
}))
//create port number
app.listen(3000,()=>{
    console.log('listening on port 3000');
})
const jwt = require('jsonwebtoken')
//application specific middleware
// const appMiddleware =(req,res,next)=>{
//     console.log("application specific middleware");
//     next();
// }
// app.use(appMiddleware)

//router specification middleware
const jwtMiddleware =(req,res,next)=>{
    console.log('router specification middleware');
    // const token =req.body.token;
    const token=req.headers['x-access-token'];
    //verify token -verify()
    const data= jwt.verify(token,'superkey2022')
    console.log(data);
    next();
}

app.post('/register',(req,res)=>
{
    console.log(req.body);
     dataService.register(req.body.acno,req.body.username,req.body.password)//data
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
   
})

app.post('/login',(req,res)=>
{
    console.log(req.body);
    dataService.login(req.body.acno,req.body.password)
    .then(result=>{
       res.status(result.statusCode).json(result)  
    })
  
})

app.post('/deposit',jwtMiddleware,(req,res)=>
{
    console.log(req.body);
     dataService.deposit(req.body.acno,req.body.password,req.body.amount)
     .then(result=>{
        res.status(result.statusCode).json(result)
     })
 
})

app.post('/withdraw',jwtMiddleware,(req,res)=>
{
    console.log(req.body);
    dataService.withdraw(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
   
})

app.post('/transaction',jwtMiddleware,(req,res)=>
{
    console.log(req.body);
    dataService.getTransaction(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
  
})
//delete
app.delete('/deleteAcc/:acno',(req,res)=>
{
    console.log(req.body);
    dataService.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
  
})