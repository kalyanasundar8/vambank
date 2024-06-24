import mongoose from "mongoose";

const MDBC = async () => {
    const dbUri = process.env.MONGO_URI;
    try {
        const conn = await mongoose.connect(dbUri);
        console.log(`Server connected to DB 🔗`);
    } catch (error) {
        console.log(`Error while connecting to DB 🥺 ${error}`);
        throw new Error(`Error while connecting to DB ${error}`)
    }
} 

export default MDBC;