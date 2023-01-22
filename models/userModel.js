import mongoose from 'mongoose'; 

const {Schema, model} = mongoose

// Declare the Schema of the Mongo model
var userSchema = new Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    }, 
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});

//Export the model
export default model('User', userSchema);