const mongoose = require('mongoose');
const {Schema}= mongoose;
const AluminiSchema = new Schema({
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
        type: Number,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    company1:{
        type: String,
        required: true
    },company2:{
        type: String
    },
    password:{
        type: String,
        required: true
    }
});
const Alumini = mongoose.model('Alumini', AluminiSchema);
module.exports = Alumini;