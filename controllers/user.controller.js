const UserModel = require("../models/User");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  try{
    const userInfo = UserModel.findById(req.params.id).select("-password");
    res.status(200).json(userInfo)
  }catch(err){
    throw err
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const updatedUser=await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body},
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );
    res.status(200).json({msg:"Utilisateur modifie avec succes !",updatedUser})
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Suppression reussi !" });
  } catch (err) {
    return res.status(500).json({err});
  }
};


