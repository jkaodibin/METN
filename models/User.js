const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  pseudo:{
    type:String,
    required:true,
    unique:true
  },
  description:{
    type: String,
    required: true,
  },
  ratings:[{
      userId:{
        type:String,
        required:true
      },
      value:{
        type:String,
        required:true
      }
    }],
  level:{
      type: String,
  },
  type:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  city:{
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  startDate:{
    type:Date,
    required:true
  },
  lastDate:{
    type:Date,
    required:true
  },
  subPrice:{
    type:Number,
    required:true
  },
  stack: {
    type: [String],
    require:false
  }
},{timestamps:true});

userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  var res={}
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      res.user=user;
    }else{
      res.errors={password:'Le mot de passe est incorrect'}
    }
  }else{
    res.errors={email:"L'email est incorrect"}
  }
  return res
};

module.exports = mongoose.model('User', userSchema);