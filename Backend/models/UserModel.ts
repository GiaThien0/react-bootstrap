import mongoose, { mongo, Schema } from "mongoose";

const UserScheme = new Schema({
    name: {
        type : String,
        require : true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
            type:Date,
            default:Date.now,

    },

    updatedAt:{
            type:Date,
            default:Date.now,

    },

});
const UserModel = mongoose.model('user',UserScheme);
export default UserModel;
    



