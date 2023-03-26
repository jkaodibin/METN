const BidModel = require("../models/Bid");

module.exports.checkBidIsMine = async (req, res, next) => {
    let bid = await BidModel.findById(req.params.id)
    if(bid){
        if (bid.userId!==req.user.id) {
            res.status(401).json({errors:{msg:"Vous ne pouvez pas effectuer cette action !"}})
        }else{
            next()
        }
        
    }else{
        res.status(401).json({errors:{msg:"Cette Proposition n'existe pas !"}})
    }
    
};