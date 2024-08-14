import mongoose from "mongoose"

const foodSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
})

const foodModel=mongoose.models.food||mongoose.model("food",foodSchema);//If the model is already present then it will use the model otherwise it will create the new model

export default foodModel;