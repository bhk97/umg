const express = require('express');
const mongoose = require('mongoose');
const studentModel = require('./studentmodel');
const app = express();
const bodyparser = require('body-parser');


mongoose.connect('mongodb+srv://bhagirath:bhagirath97@cluster0.qtwt75w.mongodb.net/').then(()=>{
	console.log('Mongodb connected');
})

app.listen(3000,()=>{
	console.log('Sever Started');
})

app.get('/',(req,res)=>{
	res.send('Server Started')
})
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json())



//post request 
app.post('/addStudent',async (req,res)=> {
	const {studentid,studentName,studentage,studentEmail} = req.body;
	
	try{
		
		const newStudent = new studentModel({studentid,studentName,studentage,studentEmail});
		const savedStudent = await newStudent.save();
		return res.status(201).json({status:true,data :savedStudent})		
	}
	catch(e){
		return res.status(500).json({status:false});
		console.log(e);
	}
	
})

//get request
app.get('/getStudent',async(req,res)=>{
	try{
		const data = await studentModel.find();
		// return res.status(201).json({status:true,data:data});
		return res.send(data)
	}
	catch(e){
		return res.status(500).json({status:false});
		console.log(e);
	}
})
//delete request
app.delete('/deleteStudent',async(req,res)=>{
	const studentName = req.body.studentName;
	try{
		const deleteData = await studentModel.deleteOne({studentName});
		return res.status(201).json({status:true});
	}
	catch(e){
		console.log(e);
		return res.status(500).json({status:false})
	}
})


