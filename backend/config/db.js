import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://ashwinv1707:170704@cluster0.gh4mi.mongodb.net/food-del').then(()=>{
        console.log("DB Connected");
    });
}