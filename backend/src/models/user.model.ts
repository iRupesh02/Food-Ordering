import mongoose , {Schema} from 'mongoose';

const userSchema = new Schema({
    auth0Id:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    phone :{
        type:String,
        
    },
    addressLine1:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    }
},{timestamps : true})

const User = mongoose.model("User" , userSchema)

export default User;