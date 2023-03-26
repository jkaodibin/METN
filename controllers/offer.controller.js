const OfferModel = require("../models/Offer");
const UserModel = require("../models/User");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.viewOffers = async(req, res) => {
  try{
    const offers=await OfferModel.find().sort({ createdAt: -1 }).limit(2);
    res.status(200).json(offers);
  }catch(err){
    throw err;
  }
};

module.exports.createOffer = async (req, res) => {
    const newOffer = new OfferModel({
      title: req.body.offerTitle,
      userId:req.user.id,
      city: req.body.city,
      stack: req.body.stack,
      minPrice:req.body.minPrice,
      maxPrice:req.body.maxPrice,
      advantages:req.body.advantages,
      limitDate:req.body.limitDate
    });
  
    try {
      const offer = await newOffer.save();
      return res.status(201).json({msg:"Offre cree avec succes !",offer});
    } catch (err) {
      throw err;
    }
};
module.exports.updateOffer = async (req, res) => {
  try{
    const updatedOffer = await OfferModel.findByIdAndUpdate(
      
      req.params.id,
      { $set: {...req.body,title:req.body.offerTitle} },
      { new: true }
    );
    res.status(200).json({msg:"Modification reussi !",updatedOffer});
  }catch(err){
    throw err;
  }
  
};
module.exports.deleteOffer = (req, res) => {
  try{
    OfferModel.findByIdAndRemove(req.params.id);
    res.status(200).json({msg:"Suppression reussi !"})
  }catch(err){
    throw err
  }
  
};
