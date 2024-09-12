const mongoose = require('mongoose');
const {Schema}= mongoose;
const StudentSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    number:{
        type: Number,
        required: true
    },
    college:{
        type: String,
        required: true
    },
    year:{
        type: Date,
        required: true
    },
    state:{
        type: Date,
        required: true
    },
    branch:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});
const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;