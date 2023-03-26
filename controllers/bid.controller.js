const BidModel = require("../models/Bid");
const UserModel = require("../models/User");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.viewBids = async(req, res) => {
  try{
    const bids=await BidModel.find({ $or:[ {'userId':req.user.id}, {'offerUserId':req.user.id}]}).sort({ createdAt: -1 }).limit(2);
    if(bids.length>0) res.status(200).json(bids);
    res.status(401).json({err:"Vous n'avez pas de proposition a afficher !"});
  }catch(err){
    throw err;
  }
};

module.exports.createBid = async (req, res) => {
    const newBid = new BidModel({
        userId:req.user.id,
        offerUserId:req.body.offerUserId,
        offerId:req.body.offerId,
        motivation:req.body.motivation,
        price: req.body.price,
        daysNumber:req.body.daysNumber
    });
  
    try {
      const bid = await newBid.save();
      return res.status(201).json({msg:"Proposition cree avec succes !",bid});
    } catch (err) {
      throw err;
    }
};
module.exports.updateBid = async (req, res) => {
  try{
    const updatedBid = await BidModel.findByIdAndUpdate(
      
      req.params.id,
      { $set: {...req.body} },
      { new: true }
    );
    res.status(200).json({msg:"Modification reussi !",updatedBid});
  }catch(err){
    throw err;
  }
  
};
module.exports.deleteBid = async (req, res) => {
  try{
    await BidModel.findByIdAndRemove(req.params.id);
    res.status(200).json({msg:"Suppression reussi !"})
  }catch(err){
    throw err
  }
  
};
