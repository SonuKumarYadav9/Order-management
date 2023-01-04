const express = require('express');
const mongoose = require('mongoose');
const router =require("./router/route")
mongoose.set('strictQuery', true)
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));



mongoose.connect("mongodb+srv://SonuKumarYadav9:Sk957079%40@cluster0.9bcnwnf.mongodb.net/Order-Management",
                    { useNewUrlParser: true})
.then(()=>console.log("Successfully Connected with MongoDB"))
.catch((err)=>console.log(err))

app.use("/",router);

const port=3000;

app.listen(process.env.PORT || port, ()=>console.log("Server Running on port",process.env.PORT || port));



// var cron = require('node-cron');

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });




