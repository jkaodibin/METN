const MessageModel = require("../models/Message");
const UserModel = require("../models/User");

module.exports.checkMessageIsMine = async (req, res, next) => {
    let message = await MessageModel.findById(req.params.id)
    if(message){
        if (message.from!==req.user.id) {
            res.status(401).json({errors:{msg:"Vous ne pouvez pas effectuer cette action !"}})
        }else{
            next()
        }
        
    }else{
        res.json({errors:{msg:"Cette Proposition n'existe pas !"}})
    }
    
};
module.exports.checkReceiverExist = async (req, res, next) => {
    let receiverExist = await UserModel.findById(req.body.receiverId)
    if(receiverExist){
        next()
    }else{
        res.status(401).json({errors:{msg:"Le destinataire n'existe pas !"}})
    }
    
};
