import mongoose from "mongoose";
const connectDb = async () =>{
    mongoose.connection.on('connected',()=>console.log('Db successfully connected'))
    await mongoose.connect(`${process.env.MONGO_URI}/myNotes`)
}

export default connectDb;