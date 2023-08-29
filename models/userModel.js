const mongoose = require("mongoose");
const CryptoJS =require('crypto-js')
const { generateToken } = require("../service/auth");


const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img:{
      type:String,
    },
    gender:{
      type:String
    }, 
    authMethod: {
      type: String,
      default: "email", // Set the default value to "email"
    },
    
  },
  { timestamps: true }
);


UserSchema.pre("save", function (next) {

  // Pre-save hook to set the authMethod property to "email"

  if (!this.authMethod) {
    this.authMethod = "email";
  }

 // Pre-save hook to encrypt password before storing 

  const user = this

  if (!user.isModified()) return

 
  this.password = CryptoJS.AES.encrypt(user.password, process.env.PASS_SEC).toString()

 return  next()
})



// static signin / login  method 

UserSchema.statics.signin = async function(username,password){


  if(!username || !password){
      throw Error("All fields must be filled")
  }
  
  //username is unique
  const user = await this.findOne({username})

  if(!user){
      throw Error("User not found!")
  }
  
  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASS_SEC
  );

  const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);



  
  if (originalPassword !== originalPassword) {
    res.status(401);
    throw new Error("Wrong Credentials");
  }
  
    
  const token =  generateToken(user)

  
  const { password:pwd, ...others } = user._doc;
  return {...others,token}
}

module.exports = mongoose.model("User", UserSchema);