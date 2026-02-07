const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();



const app = express();
app.use(express.json());

app.use(cors())

const Contact = require("./models/Contact");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.get("/" , (req,res) =>{
    res.send("Server working");
});

app.post("/contact" , async(req, res)=>{
    try{
        const {name, email,service,message,phone}= req.body;
        if (!name || !email || !message || !service ) {
            return res.status(400).json({ message: "All fields required" });
        } 
        await Contact.create({name,email,message,service,phone})

        res.status(201).json({ message: "Message send succesfully" });
    } catch(error){
        console.log(error)
        res.status(500).json({ message:"Something went wrong"});
    }
});
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});