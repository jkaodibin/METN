const MessageModel = require("../models/Message");
const UserModel = require("../models/User");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.viewMessages = async(req, res) => {
  try{
    const offers=await MessageModel.find({$or:[ {'from':req.user.id}, {'to':req.user.id}]}).sort({ createdAt: -1 }).limit(10);
    res.status(200).json(offers);
  }catch(err){
    throw err;
  }
};

module.exports.createMessage = async (req, res) => {
    const newMessage = new MessageModel({
      from:req.user.id,
      to: req.body.receiverId,
      text: req.body.text,
    });
  
    try {
      const message = await newMessage.save();
      return res.status(201).json({msg:"Message cree avec succes !",message});
    } catch (err) {
      throw err;
    }
};
module.exports.deleteMessage = async (req, res) => {
  try{
    await MessageModel.findByIdAndRemove(req.params.id);
    res.status(200).json({msg:"Suppression reussi !"})
  }catch(err){
    throw err
  }
  
};
