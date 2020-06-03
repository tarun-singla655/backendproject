import * as mongoose from 'mongoose'
import {model } from 'mongoose';
const videoSchem = new mongoose.Schema({
    video_url : {type : String, required : true},
    title : {type : String , required:true },
    description : {type : String , required : true},
    category : {type:String , required : true},
    created_at : {type: Number,required: true, default : Date.now()},
    updated_at : {type: Number,required:true,default:Date.now() },
    comments: [{type: mongoose.Types.ObjectId, ref: 'comments'}]
})


export default model('videos',videoSchem);