const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

module.exports.signUp = async (req, res) => {
  const {pseudo,firstName,lastName,description,type,email,city,password,stack} = req.body
  const newUser = new UserModel({pseudo,firstName,lastName,description,type,email,city,password,stack});
  try {
    const user=await newUser.save()
    return res.status(201).json({ msg:"Utilisateur cree avec succes !",user: user});
  }
  catch(err) {
    return res.status(500).json(err.message)
  }
}

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const {user,errors} = await UserModel.login(email, password);
    if(errors) return res.status(401).json({errors})
  
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge});
      res.status(200).json({ user: user._id})
    
  } catch (err){
    throw err
  }
}

module.exports.signOut = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.json({msg:"Deconnexion avec succes !"})
}