const mongoose = require('mongoose')

const connectDB = async ()=>{

    try{
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Database!:",
        connect.connection.host,
        connect.connection.name
        )

    }catch(err){
        console.log(err)
        process.exit(1) //if error occurs exit 
    }
}

module.exports = connectDB