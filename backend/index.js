const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const userRoutes=require('./routes/UserRoutes');
require("dotenv").config();
const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes)
const port=process.env.PORT || 5000;



mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log('Connected to MongoDB')})
.catch((err)=>console.log(err));

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})