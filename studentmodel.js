const mongoose = require('mongoose');
const {Schema} = mongoose;
const studentSchema = new Schema({
	studentid:Number,
	studentName : String,
	studentage: Number,
	studentEmail: String
})



const studentModel = mongoose.model('students',studentSchema);
module.exports = studentModel;