const OfferModel = require("../models/Offer");

module.exports.checkOfferIsMine = async (req, res, next) => {
    let offer = await OfferModel.findById(req.params.id)
    if(offer){
        if (offer.userId!==req.user.id) {
            res.status(401).json({errors:{msg:"Vous ne pouvez pas modifier cette offre !"}})
        }else{
            next()
        }
        
    }else{
        res.status(401).json({errors:{msg:"Cette offre n'existe pas !"}})
    }
    
};