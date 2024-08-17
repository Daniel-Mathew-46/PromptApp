import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {

    //If we don't set the mongoose options, we gonna get warning in the console
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDb is already connected.')
        return
    }

    try {
        await(mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        }))
        isConnected = true
        console.log("MongoDB connected.")
    } catch (error) {
        console.log(error)
    }
}