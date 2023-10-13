import mongoose from 'mongoose'

let isConnected = false; //allows to track the connection status

const connectDB = async () => {
    mongoose.set('strictQuery', true)
    if(isConnected){
        console.log('Database is already connected')
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'prompts',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true

        console.log('Database is connected')

    }
    catch(error){
        console.log(error)
    }
}

export default connectDB